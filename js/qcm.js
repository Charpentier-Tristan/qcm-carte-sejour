const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const theme = params.get("theme");
const exam = params.get("exam");
const levelParam = params.get("level");

let questions = [];
let current = 0;
let userAnswers = []; // Stocke les réponses choisies

Array.prototype.shuffle = function() {
  for (let position = this.length; position > 0; position--) {
    const random_index = Math.floor(Math.random() * position);
    const temp = this[position - 1];
    this[position - 1] = this[random_index];
    this[random_index] = temp;
  }
  return this;
};

const examLabels = {
  initiation: "Initiation",
  pluriannuelle: "Carte de séjour pluriannuelle",
  resident: "Carte de résident"
};

function getActiveLevel() {
  const stored = localStorage.getItem("examLevel");
  return levelParam || stored || "";
}

function normalizeAnswers(q) {
  if (!Array.isArray(q.answers)) return [];
  if (q.answers.length === 0) return [];
  if (typeof q.answers[0] === "string") {
    return q.answers.map((label, i) => ({ id: String(i), label }));
  }
  return q.answers.map(a => ({
    id: String(a.id),
    label: a.label
  }));
}

function normalizeCorrect(q, answers) {
  if (Array.isArray(q.correct)) {
    return q.correct.map(id => String(id));
  }
  if (typeof q.correct === "number") {
    return [String(q.correct)];
  }
  if (typeof q.correct === "string") {
    return [q.correct];
  }
  return answers.length === 1 ? [answers[0].id] : [];
}

function normalizeQuestion(q) {
  const answers = normalizeAnswers(q);
  const correct = normalizeCorrect(q, answers);
  const questionText = Array.isArray(q.question) ? (q.question[0] || "") : q.question;
  const displayAnswers = answers.slice().shuffle();
  return {
    ...q,
    question: questionText,
    answers,
    displayAnswers,
    correct,
    type: "single"
  };
}

function loadQuestions() {
  const level = getActiveLevel();
  if(type === "examen") {
    const header = document.querySelector("header h1");
    const examLabel = examLabels[exam] || "Examen complet";
    if (header) header.textContent = `QCM - ${examLabel}`;
    localStorage.setItem("examType", exam || "examen");
    localStorage.setItem("examTypeLabel", examLabel);
    if (level) localStorage.setItem("examLevel", level);

    loadExamQuestions(level)
      .then(data => {
        if (!data || data.length === 0) {
          redirectError("Aucune question trouvée pour ce niveau.", "Vérifiez les fichiers JS dans le dossier questions.");
          return;
        }
        const normalized = data.map(normalizeQuestion);
        questions = normalized;
        questions.shuffle();
        questions = questions.slice(0, 40);
        showQuestion();
      })
      .catch(e => {
        redirectError("Fichier d'examen introuvable.", e && e.message ? e.message : "");
      });
  } else if(type === "theme") {
    localStorage.removeItem("examType");
    localStorage.removeItem("examTypeLabel");
    if (level) localStorage.setItem("examLevel", level);
    loadThemeQuestions(theme, level)
      .then(data => {
        if (!data || data.length === 0) {
          redirectError("Aucune question trouvée pour ce thème.", "Vérifiez le fichier JS du thème.");
          return;
        }
        questions = data.map(normalizeQuestion);
        showQuestion();
      })
      .catch(e => {
        redirectError("Fichier du thème introuvable.", e && e.message ? e.message : "");
      });
  }
}

function showQuestion() {
  if(current >= questions.length){
    persistResults();
    window.location.href = "resultat.html";
    return;
  }

  const q = questions[current];
  document.getElementById("question").textContent = q.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  (q.displayAnswers || q.answers).forEach((a)=>{
    const btn = document.createElement("button");
    btn.textContent = a.label;
    btn.classList.add("answer-btn");
    if((userAnswers[current] || []).includes(a.id)) btn.classList.add("selected");
    btn.onclick = () => selectAnswer(q, btn, a.id);
    answersDiv.appendChild(btn);
  });

  document.getElementById("counter").textContent = `${current+1} / ${questions.length}`;

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  nextBtn.disabled = !(userAnswers[current] && userAnswers[current].length);
  nextBtn.onclick = () => { current++; showQuestion(); };
  prevBtn.disabled = current === 0;
  prevBtn.onclick = () => { current--; showQuestion(); };
}

function selectAnswer(q, btn, answerId){
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected");
  userAnswers[current] = [answerId];
  document.getElementById("nextBtn").disabled = !(userAnswers[current] && userAnswers[current].length);
}

function calculateScore(){
  let score = 0;
  questions.forEach((q,i)=>{
    const user = userAnswers[i] || [];
    const correct = q.correct || [];
    if (user.length === 1 && correct.includes(user[0])) score++;
  });
  return score;
}

function persistResults() {
  localStorage.setItem("lastScore", calculateScore());
  localStorage.setItem("totalQuestions", questions.length);
  localStorage.setItem("questions", JSON.stringify(questions.map((q,i)=>({
    ...q,
    userAnswerIds: userAnswers[i] || []
  }))));
}

loadQuestions();

function loadExamQuestions(level) {
  if (!level) return Promise.reject(new Error("Niveau manquant"));
  const themeIds = typeof THEMES !== "undefined" ? THEMES.map(t => t.id) : [];
  if (themeIds.length === 0) return Promise.reject(new Error("Thèmes manquants"));

  const loads = themeIds.map(themeId => loadThemeQuestions(themeId, level).catch(() => []));
  return Promise.all(loads).then(parts => parts.flat());
}

function loadThemeQuestions(themeId, level) {
  if (!themeId || !level) return Promise.reject(new Error("Theme ou niveau manquant"));
  const code = typeof getLevelCode === "function" ? getLevelCode(level) : "";
  if (!code) return Promise.reject(new Error("Code niveau introuvable"));
  const varName = `${themeId}_${code}`;
  const path = `questions/${code}/${themeId}_${code}.js`;
  return fetch(path)
    .then(r => {
      if (!r.ok) throw new Error(`Fichier introuvable: ${path}`);
      return r.text();
    })
    .then(text => extractQuestionsFromScript(text, varName));
}

function extractQuestionsFromScript(text, varName) {
  const trimmed = text.trim();
  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    return JSON.parse(trimmed);
  }
  const fn = new Function(`${text}; return (typeof ${varName} !== "undefined") ? ${varName} : null;`);
  const data = fn();
  if (!data) throw new Error(`Variable ${varName} introuvable`);
  return data;
}

function redirectError(message, details) {
  const msg = encodeURIComponent(message || "Erreur de chargement.");
  const det = encodeURIComponent(details || "");
  window.location.href = `error.html?message=${msg}&details=${det}`;
}
