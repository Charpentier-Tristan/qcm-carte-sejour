App.dom.onReady(function () {
  var resultsDiv = App.dom.byId("results");
  if (!resultsDiv) return;

  function normalizeQuizContextLabel(label) {
    var parts = String(label || "")
      .split(" | ")
      .map(function (part) { return part.trim(); })
      .filter(Boolean);

    if (parts.length % 2 === 0) {
      var half = parts.length / 2;
      var firstHalf = parts.slice(0, half).join(" | ");
      var secondHalf = parts.slice(half).join(" | ");
      if (firstHalf === secondHalf) {
        return firstHalf;
      }
    }

    return parts.join(" | ");
  }

  var questions = App.storage.getJSON("questions", []);
  var lastScore = App.storage.getNumber("lastScore", 0);
  var totalQuestions = App.storage.getNumber("totalQuestions", 0);
  var quizContextLabel = normalizeQuizContextLabel(App.storage.getString("quizContextLabel", ""));
  if (quizContextLabel) {
    App.storage.setString("quizContextLabel", quizContextLabel);
  }

  var html = "<div class=\"results-summary\">"
    + "<h2>Score : " + lastScore + " / " + totalQuestions + "</h2>";
  if (quizContextLabel) {
    html += "<p>" + App.utils.escapeHtml(quizContextLabel) + "</p>";
  }
  html += "</div>";

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
      + (isCorrect ? "" : "<p>Ta reponse: " + userAnswer + "</p>")
      + "<p>Bonne reponse: " + correctAnswer + "</p>"
      + explanationHtml
      + "</div>";
  });

  resultsDiv.innerHTML = html;
});
