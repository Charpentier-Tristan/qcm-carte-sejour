App.dom.onReady(function () {
  var container = App.dom.byId("stats");
  if (!container) return;

  function clearStats() {
    [
      "statsHistory",
      "lastScore",
      "totalQuestions",
      "quizContextLabel",
      "questions"
    ].forEach(function (key) {
      App.storage.remove(key);
    });
  }

  function renderEmptyState() {
    container.innerHTML = ""
      + "<h2>Aucune statistique</h2>"
      + "<p>Faites un quiz pour voir vos stats.</p>";
  }

  function render() {
    var history = App.storage.getJSON("statsHistory", []);
    if (!Array.isArray(history) || history.length === 0) {
      renderEmptyState();
      return;
    }

    var totalCorrect = 0;
    var totalQuestions = 0;
    history.forEach(function (h) {
      totalCorrect += h.score || 0;
      totalQuestions += h.total || 0;
    });

    var avgPercent = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    var totalQuizzes = history.length;
    var recent = history.slice().reverse().slice(0, 5);

    var recentHtml = recent.map(function (h) {
      var date = new Date(h.date);
      var dateLabel = isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR");
      return "<li>" + dateLabel + " - " + (h.score || 0) + " / " + (h.total || 0) + "</li>";
    }).join("");

    container.innerHTML = ""
      + "<h2>Résumé</h2>"
      + "<p>Pourcentage de bonnes réponses : " + avgPercent + "%</p>"
      + "<p>Nombre total de questions : " + totalQuestions + "</p>"
      + "<p>Nombre de quiz : " + totalQuizzes + "</p>"
      + "<p>Nombre total de bonnes réponses : " + totalCorrect + "</p>"
      + "<h2>Derniers résultats</h2>"
      + "<ul>" + recentHtml + "</ul>"
      + "<div class=\"stats-actions\">"
      + "<button type=\"button\" id=\"clear-stats\" class=\"button-danger\">Effacer les stats</button>"
      + "</div>";

    var clearButton = App.dom.byId("clear-stats");
    if (clearButton) {
      clearButton.addEventListener("click", function () {
        if (!window.confirm("Voulez-vous vraiment remettre les statistiques à zéro ?")) return;
        clearStats();
        render();
      });
    }
  }

  render();
});
