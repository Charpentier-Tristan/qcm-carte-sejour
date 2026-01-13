const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const theme = params.get("theme");

let questions = [];
let current = 0;
let userAnswers = []; // Stocke les réponses choisies

function loadQuestions() {
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
    fetch(`questions/${theme}.json`)
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
    localStorage.setItem("lastScore", calculateScore());
    localStorage.setItem("totalQuestions", questions.length);
    localStorage.setItem("questions", JSON.stringify(questions.map((q,i)=>({
      ...q, userAnswer: userAnswers[i] !== undefined ? q.answers[userAnswers[i]] : ""
    }))));
    window.location.href = "resultat.html";
    return;
  }

  const q = questions[current];
  document.getElementById("question").textContent = q.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((a,i)=>{
    const btn = document.createElement("button");
    btn.textContent = a;
    btn.classList.add("answer-btn");
    if(userAnswers[current]===i) btn.classList.add("selected");
    btn.onclick = () => selectAnswer(btn, i);
    answersDiv.appendChild(btn);
  });

  document.getElementById("counter").textContent = `${current+1} / ${questions.length}`;

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  nextBtn.disabled = userAnswers[current] === undefined;
  nextBtn.onclick = () => { current++; showQuestion(); };
  prevBtn.disabled = current === 0;
  prevBtn.onclick = () => { current--; showQuestion(); };
}

function selectAnswer(btn,index){
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected");
  userAnswers[current] = index;
  document.getElementById("nextBtn").disabled = false;
}

function calculateScore(){
  let score = 0;
  questions.forEach((q,i)=>{
    if(userAnswers[i] === q.correct) score++;
  });
  return score;
}

function shuffle(a){ return a.sort(()=>Math.random()-0.5); }

loadQuestions();
