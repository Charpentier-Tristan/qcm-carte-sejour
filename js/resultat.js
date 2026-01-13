document.addEventListener("DOMContentLoaded", function() {
    const resultsDiv = document.getElementById("results");
    if(!resultsDiv) return;

    const questions = JSON.parse(localStorage.getItem("questions") || "[]");
    const lastScore = parseInt(localStorage.getItem("lastScore") || "0");
    const totalQuestions = parseInt(localStorage.getItem("totalQuestions") || "0");

    let html = `<h2>Score : ${lastScore} / ${totalQuestions}</h2>`;

    questions.forEach((q,i) => {
        const userAnswerIndex = q.userAnswer;
        const userAnswer = userAnswerIndex !== undefined ? q.answers[userAnswerIndex] : '—';
        const correctAnswer = q.answers[q.correct];

        html += `
            <div class="result-card ${userAnswer === correctAnswer ? 'correct' : 'wrong'}">
                <h3>Q${i+1}: ${q.question}</h3>
                <p>Ta réponse: ${userAnswer}</p>
                <p>Bonne réponse: ${correctAnswer}</p>
                ${q.explanation ? `<p class="explanation">${q.explanation}</p>` : ''}
            </div>
        `;
    });

    resultsDiv.innerHTML = html;
});
