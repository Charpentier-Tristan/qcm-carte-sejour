App.dom.onReady(function () {
  var params = new URLSearchParams(window.location.search);
  var level = params.get("level");

  var levelLabel = App.dom.byId("levelLabel");
  if (!levelLabel) {
    var header = App.dom.byId("app-header");
    levelLabel = header ? header.querySelector("h2") : null;
  }

  var levelHint = App.dom.byId("levelHint");
  var themesList = App.dom.byId("themesList");
  var examList = App.dom.byId("examList");

  if (!level) {
    if (levelLabel) levelLabel.textContent = "Niveau manquant";
    if (levelHint) levelHint.textContent = "Veuillez choisir un niveau d'examen civique.";
    return;
  }

  var label = typeof getLevelLabel === "function" ? getLevelLabel(level) : level;
  if (levelLabel) levelLabel.textContent = "Niveau : " + label;
  App.storage.setString("examLevel", level);

  if (typeof THEMES !== "undefined" && themesList) {
    THEMES.forEach(function (t) {
      var a = document.createElement("a");
      a.href = "qcm.html?type=theme&theme=" + t.id + "&level=" + level;
      a.className = "button";
      a.textContent = t.label;
      themesList.appendChild(a);
    });
  }

  if (examList) {
    var examBtn = document.createElement("a");
    examBtn.href = "qcm.html?type=examen&level=" + level;
    examBtn.className = "button";
    examBtn.textContent = "Examen complet";
    examList.appendChild(examBtn);
  }
});
