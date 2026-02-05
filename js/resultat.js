document.addEventListener("DOMContentLoaded", function(){
  const resultsDiv = document.getElementById("results");
  if(!resultsDiv) return;

  const questions = JSON.parse(localStorage.getItem("questions") || "[]");
  const lastScore = parseInt(localStorage.getItem("lastScore") || "0");
  const totalQuestions = parseInt(localStorage.getItem("totalQuestions") || "0");
  const examTypeLabel = localStorage.getItem("examTypeLabel");
  const examLevel = localStorage.getItem("examLevel");

  let html = `<h2>Score : ${lastScore} / ${totalQuestions}</h2>`;
  if (examTypeLabel) {
    html += `<p>Type d'examen : ${examTypeLabel}</p>`;
  }
  if (examLevel && typeof getLevelLabel === "function") {
    html += `<p>Niveau : ${getLevelLabel(examLevel)}</p>`;
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

  function labelsFor(q, ids) {
    if (!ids || ids.length === 0) return "—";
    const answers = normalizeAnswers(q);
    const map = new Map(answers.map(a => [a.id, a.label]));
    return ids.map(id => map.get(String(id)) || String(id)).join(", ");
  }

  questions.forEach((q,i)=>{
    const userIds = q.userAnswerIds || [];
    const correctIds = Array.isArray(q.correct)
      ? q.correct.map(String)
      : (q.correct === undefined || q.correct === null ? [] : [String(q.correct)]);
    const userAnswer = labelsFor(q, userIds);
    const correctAnswer = labelsFor(q, correctIds);
    const isCorrect = userIds.length === 1 && correctIds.includes(String(userIds[0]));
    html += `
      <div class="result-card ${isCorrect?'correct':'wrong'}">
        <h3>Q${i+1}: ${q.question}</h3>
        <p>Ta réponse: ${userAnswer}</p>
        <p>Bonne réponse: ${correctAnswer}</p>
        ${q.explanation ? `<p class="explanation">${q.explanation}</p>` : ''}
      </div>
    `;
  });

  resultsDiv.innerHTML = html;
});
