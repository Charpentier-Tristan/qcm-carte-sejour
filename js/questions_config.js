window.App = window.App || {};

App.data = {
  LEVELS: [
    { id: "initiation", label: "Initiation", code: "INI" },
    { id: "pluriannuelle", label: "Carte de sejour pluriannuelle", code: "CSP" },
    { id: "resident", label: "Carte de resident", code: "CRE" },
    { id: "naturalisation", label: "Naturalisation", code: "NAT" }
  ],

  THEMES: [
    { id: "symboles", label: "Devise et symboles" },
    { id: "laique", label: "Laicite" },
    { id: "situationpv", label: "Mises en situation : Principes et valeurs de la Republique" },
    { id: "vote", label: "Democratie et droit de vote" },
    { id: "orgarep", label: "Organisation de la Republique" },
    { id: "insteurope", label: "Institutions europeennes" },
    { id: "droits", label: "Droits fondamentaux" },
    { id: "devoirs", label: "Obligations et devoirs" },
    { id: "situationdd", label: "Mises en situation : Droits et devoirs" },
    { id: "periodes", label: "Periodes et personnages historiques" },
    { id: "territoire", label: "Territoire et geographie" },
    { id: "patrimoine", label: "Patrimoine francais" },
    { id: "resider", label: "S'installer et resider en France" },
    { id: "soins", label: "L'acces aux soins" },
    { id: "travailler", label: "Travailler en France" },
    { id: "parent", label: "Autorite parentale et systeme educatif" }
  ],

  EXAM_LABELS: {
    initiation: "Initiation",
    pluriannuelle: "Carte de sejour pluriannuelle",
    resident: "Carte de resident",
    naturalisation: "Naturalisation",
    video: "Videos"
  },

  EXAM_THEME_DISTRIBUTION: [
    { id: "symboles", count: 3 },
    { id: "laique", count: 2 },
    { id: "situationpv", count: 6 },
    { id: "vote", count: 3 },
    { id: "orgarep", count: 2 },
    { id: "insteurope", count: 1 },
    { id: "droits", count: 2 },
    { id: "devoirs", count: 3 },
    { id: "situationdd", count: 6 },
    { id: "periodes", count: 3 },
    { id: "territoire", count: 3 },
    { id: "patrimoine", count: 2 },
    { id: "resider", count: 1 },
    { id: "soins", count: 1 },
    { id: "travailler", count: 1 },
    { id: "parent", count: 1 }
  ],

  COURSE_GROUPS: [
    {
      key: "histoire-france",
      title: "Histoire de France",
      ids: [
        "chronologie",
        "ancienregime",
        "causesrevolution",
        "raison",
        "lumieres",
        "napoleon",
        "esclavage",
        "colonialisme",
        "troisieme",
        "guerres",
        "cinquieme",
        "construction"
      ]
    },
    {
      key: "vivre-france",
      title: "Vivre en France",
      ids: [
        "geographie",
        "arrivee",
        "ideesrecues",
        "sante",
        "banque",
        "logement",
        "travail",
        "permis",
        "principes",
        "laicite",
        "institutions",
        "europe"
      ]
    }
  ],

  QUIZ_LIMITS: {
    theme: 10
  },

  getLevelLabel: function (levelId) {
    var match = App.data.LEVELS.find(function (item) {
      return item.id === levelId;
    });
    return match ? match.label : "";
  },

  getLevelCode: function (levelId) {
    var match = App.data.LEVELS.find(function (item) {
      return item.id === levelId;
    });
    return match ? match.code : "";
  },

  getExamLabel: function (examId) {
    return App.data.EXAM_LABELS[examId] || "Examen complet";
  },

  getThemeLabel: function (themeId) {
    var match = App.data.THEMES.find(function (item) {
      return item.id === themeId;
    });
    return match ? match.label : (themeId || "");
  },

  getCourseGroupByThemeId: function (themeId) {
    return App.data.COURSE_GROUPS.find(function (group) {
      return group.ids.includes(themeId);
    }) || null;
  },

  getCourseThemeLabel: function (themeId) {
    var group = App.data.getCourseGroupByThemeId(themeId);
    return group ? group.title : "";
  },

  isCourseLevel: function (levelId) {
    var normalized = String(levelId || "").toLowerCase();
    return normalized === "video" || normalized === "vid";
  },

  getQuestionFileCode: function (levelId) {
    if (App.data.isCourseLevel(levelId)) return "VID";
    return App.data.getLevelCode(levelId);
  }
};

window.LEVELS = App.data.LEVELS;
window.THEMES = App.data.THEMES;
window.getLevelLabel = App.data.getLevelLabel;
window.getLevelCode = App.data.getLevelCode;
