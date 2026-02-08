App.dom.onReady(function () {
  var resultsDiv = App.dom.byId("results");
  if (!resultsDiv) return;

  var questions = App.storage.getJSON("questions", []);
  var lastScore = App.storage.getNumber("lastScore", 0);
  var totalQuestions = App.storage.getNumber("totalQuestions", 0);
  var examTypeLabel = App.storage.getString("examTypeLabel", "");
  var examLevel = App.storage.getString("examLevel", "");

  var html = "<h2>Score : " + lastScore + " / " + totalQuestions + "</h2>";
  if (examTypeLabel) {
    html += "<p>Type d'examen : " + App.utils.escapeHtml(examTypeLabel) + "</p>";
  }
  if (examLevel && typeof getLevelLabel === "function") {
    html += "<p>Niveau : " + App.utils.escapeHtml(getLevelLabel(examLevel)) + "</p>";
  }

  questions.forEach(function (q, i) {
    var userIds = q.userAnswerIds || [];
    var correctIds = Array.isArray(q.displayCorrect) && q.displayCorrect.length
      ? q.displayCorrect.map(String)
      : (Array.isArray(q.correct)
        ? q.correct.map(String)
        : (q.correct === undefined || q.correct === null ? [] : [String(q.correct)]));
    var userAnswer = App.utils.escapeHtml(App.quiz.labelsFor(q, userIds));
    var correctAnswer = App.utils.escapeHtml(App.quiz.labelsFor(q, correctIds));
    var isCorrect = userIds.length === 1 && correctIds.includes(String(userIds[0]));
    var questionText = App.utils.escapeHtml(q.question || "");
    var explanationText = q.explanation || q.explication || "";
    var explanationHtml = explanationText
      ? "<p class=\"explanation\">" + App.utils.escapeHtml(explanationText) + "</p>"
      : "";
    html += ""
      + "<div class=\"result-card " + (isCorrect ? "correct" : "wrong") + "\">"
      + "<h3>Q" + (i + 1) + ": " + questionText + "</h3>"
      + (isCorrect ? "" : "<p>Ta réponse: " + userAnswer + "</p>")
      + "<p>Bonne réponse: " + correctAnswer + "</p>"
      + explanationHtml
      + "</div>";
  });

  resultsDiv.innerHTML = html;
});
