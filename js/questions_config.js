window.App = window.App || {};

App.data = {
  LEVELS: [
    { id: "initiation", label: "Initiation", code: "CI" },
    { id: "pluriannuelle", label: "Carte de séjour pluriannuelle", code: "CSP" },
    { id: "resident", label: "Carte de résident", code: "CR" }
  ],
  THEMES: [
    { id: "geographie", label: "Territoire et géographie" },
    { id: "principes_republique", label: "Principes de la République" },
    { id: "systeme_institutionnel", label: "Système institutionnel" },
    { id: "droits_devoirs", label: "Droits et devoirs" },
    { id: "histoire_geographie", label: "Histoire, géographie et culture" },
    { id: "vivre_societe", label: "Vivre dans la société française" }
  ],
  getLevelLabel: function (levelId) {
    var match = App.data.LEVELS.find(function (l) { return l.id === levelId; });
    return match ? match.label : "";
  },
  getLevelCode: function (levelId) {
    var match = App.data.LEVELS.find(function (l) { return l.id === levelId; });
    return match ? match.code : "";
  }
};

window.LEVELS = App.data.LEVELS;
window.THEMES = App.data.THEMES;
window.getLevelLabel = App.data.getLevelLabel;
window.getLevelCode = App.data.getLevelCode;
