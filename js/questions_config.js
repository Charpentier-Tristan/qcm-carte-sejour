window.App = window.App || {};

App.data = {
  LEVELS: [
    { id: "initiation", label: "Initiation", code: "INI" },
    { id: "pluriannuelle", label: "Carte de séjour pluriannuelle", code: "CSP" },
    { id: "resident", label: "Carte de résident", code: "CRE" },
    { id: "naturalisation", label: "Naturalisation", code: "NAT" }
  ],
  THEMES: [
    { id: "symboles", label: "Devise et symboles" },
    { id: "laique", label: "Laïcité" },
    { id: "situationpv", label: "Mises en situation : Principes et valeurs de la République" },
    { id: "vote", label: "Démocratie et droit de vote" },
    { id: "orgarep", label: "Organisation de la République" },
    { id: "insteurope", label: "Institutions européennes" },
    { id: "droits", label: "Droits fondamentaux" },
    { id: "devoirs", label: "Obligations et devoirs" },
    { id: "Mises en situationdd", label: "Mises en situation : Droits et devoirs" },
    { id: "periodes", label: "Périodes et personnages historiques" },
    { id: "territoire", label: "Territoire et géographie" },
    { id: "patrimoine", label: "Patrimoine français" },
    { id: "resider", label: "S'installer et résider en France" },
    { id: "soins", label: "L'accès aux soins" },
    { id: "travailler", label: "Travailler en France" },
    { id: "parent", label: "Autorité parentale et système éducatif" },

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
