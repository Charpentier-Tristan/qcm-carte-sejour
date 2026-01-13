const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const theme = params.get("theme");

let questions = [];
let current = 0;
let score = 0;
let userAnswers = [];

function loadQuestions() {
  let url;
  if(type === "examen") {
    const themeFiles = [
      "questions/principes_republique.json",
      "questions/systeme_institutionnel.json",
      "questions/droits_devoirs.json",
      "questions/histoire_geographie.json",
      "questions/vivre_societe.json"
    ];
    Promise.all(themeFiles.map(f => fetch(f).then(r=>r.json())))
      .then(data => {
        questions = data.flat();
        questions = shuffle(questions).slice(0,40);
        showQuestion();
      });
  } else if(type === "theme") {
    url = `questions/${theme}.json`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        questions = data;
        showQuestion();
      })
      .catch(e => console.error("Erreur JSON thème:", e));
  }
}

function showQuestion() {
  if(current >= questions.length){
    questions.forEach((q,i) => q.userAnswer = userAnswers[i]);
    localStorage.setItem("lastScore", score);
    localStorage.setItem("totalQuestions", questions.length);
    localStorage.setItem("questions", JSON.stringify(questions));
    window.location.href = "resultat.html";
    return;
  }

  const q = questions[current];
  document.getElementById("question").textContent = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((a, i) => {
    const btn = document.createElement("button");
    btn.textContent = a;
    btn.classList.add("answer-btn");
    btn.onclick = () => selectAnswer(btn, i);
    answersDiv.appendChild(btn);
  });

  const nextBtn = document.getElementById("nextBtn");
  nextBtn.disabled = true;
  nextBtn.onclick = () => {
    if(userAnswers[current] === q.correct) score++;
    current++;
    showQuestion();
  };

  document.getElementById("counter").textContent = `${current+1} / ${questions.length}`;
}

function selectAnswer(btn, index) {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  userAnswers[current] = index;

  const nextBtn = document.getElementById("nextBtn");
  nextBtn.disabled = false;
}

function shuffle(a){return a.sort(()=>Math.random()-0.5)}

loadQuestions();
