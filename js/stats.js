App.dom.onReady(function () {
  var container = App.dom.byId("stats");
  if (!container) return;

  var history = App.storage.getJSON("statsHistory", []);
  if (!Array.isArray(history) || history.length === 0) {
    container.innerHTML = "<h2>Aucune statistique</h2><p>Faites un QCM pour voir vos stats.</p>";
    return;
  }

  var totalCorrect = 0;
  var totalQuestions = 0;
  history.forEach(function (h) {
    totalCorrect += h.score || 0;
    totalQuestions += h.total || 0;
  });

  var avgPercent = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  var avgScore = history.length ? (totalCorrect / history.length).toFixed(1) : "0";

  var recent = history.slice().reverse().slice(0, 5);

  var recentHtml = recent.map(function (h) {
    var date = new Date(h.date);
    var dateLabel = isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR");
    return "<li>" + dateLabel + " - " + (h.score || 0) + " / " + (h.total || 0) + "</li>";
  }).join("");

  container.innerHTML = ""
    + "<h2>Résumé</h2>"
    + "<p>Moyenne de bonnes réponses : " + avgPercent + "%</p>"
    + "<p>Moyenne par QCM : " + avgScore + " bonnes réponses</p>"
    + "<p>Total de questions répondues : " + totalQuestions + "</p>"
    + "<h2>Derniers résultats</h2>"
    + "<ul>" + recentHtml + "</ul>";
});
