App.dom.onReady(function () {
  var params = new URLSearchParams(window.location.search);
  var level = params.get("level");

  var THEME_SECTIONS = [
    {
      title: "Principes et valeurs de la R\u00e9publique",
      items: [
        { label: "Devise et symboles", id: "symboles" },
        { label: "La\u00efcit\u00e9", id: "laique" },
        { label: "Mises en situation", id: "situationpv" }
      ]
    },
    {
      title: "Syst\u00e8me institutionnel et politique",
      items: [
        { label: "D\u00e9mocratie et droit de vote", id: "vote" },
        { label: "Organisation de la R\u00e9publique", id: "orgarep" },
        { label: "Institutions europ\u00e9ennes", id: "insteurope" }
      ]
    },
    {
      title: "Droits et devoirs",
      items: [
        { label: "Droits fondamentaux", id: "droits" },
        { label: "Obligations et devoirs", id: "devoirs" },
        { label: "Mises en situation", id: "situationdd" }
      ]
    },
    {
      title: "Histoire, g\u00e9ographie et culture",
      items: [
        { label: "P\u00e9riodes et personnages historiques", id: "periodes" },
        { label: "Territoire et g\u00e9ographie", id: "territoire" },
        { label: "Patrimoine fran\u00e7ais", id: "patrimoine" }
      ]
    },
    {
      title: "Vivre dans la soci\u00e9t\u00e9 fran\u00e7aise",
      items: [
        { label: "S'installer et r\u00e9sider en France", id: "resider" },
        { label: "L'acc\u00e8s aux soins", id: "soins" },
        { label: "Travailler en France", id: "travailler" },
        { label: "Autorit\u00e9 parentale et syst\u00e8me \u00e9ducatif", id: "parent" }
      ]
    }
  ];

  function getLevelLabelNode() {
    var node = App.dom.byId("levelLabel");
    if (node) return node;
    var header = App.dom.byId("app-header");
    return header ? header.querySelector("h2") : null;
  }

  function buildQuizUrl(options) {
    var query = [
      "type=" + encodeURIComponent(options.type),
      "level=" + encodeURIComponent(options.level),
      "restart=1"
    ];
    if (options.theme) query.push("theme=" + encodeURIComponent(options.theme));
    return "qcm.html?" + query.join("&");
  }

  function renderThemeLink(item, levelId) {
    var link = document.createElement("a");

    link.className = "theme-accordion-link";
    link.href = buildQuizUrl({ type: "theme", theme: item.id, level: levelId });
    link.innerHTML = "<span>" + item.label + "</span>";

    return link;
  }

  function renderSection(section, levelId) {
    var details = document.createElement("details");
    var summary = document.createElement("summary");
    var list = document.createElement("div");

    details.className = "theme-accordion-section";

    summary.textContent = section.title;
    details.appendChild(summary);

    list.className = "theme-accordion-list";
    section.items.forEach(function (item) {
      list.appendChild(renderThemeLink(item, levelId));
    });

    details.appendChild(list);
    return details;
  }

  function enableSingleOpenBehavior(container) {
    container.addEventListener("toggle", function (event) {
      var opened = event.target;
      if (!opened || opened.tagName !== "DETAILS" || !opened.open) return;
      container.querySelectorAll("details.theme-accordion-section").forEach(function (node) {
        if (node !== opened) node.open = false;
      });
    }, true);
  }

  function renderThemeAccordion(themesListNode, levelId) {
    var accordion = document.createElement("div");
    accordion.className = "themes-accordion";

    THEME_SECTIONS.forEach(function (section) {
      accordion.appendChild(renderSection(section, levelId));
    });

    enableSingleOpenBehavior(accordion);
    themesListNode.innerHTML = "";
    themesListNode.appendChild(accordion);
  }

  function renderExamButton(examListNode, levelId) {
    if (!examListNode) return;
    var examBtn = document.createElement("a");
    var examMeta = document.createElement("p");

    examBtn.href = buildQuizUrl({ type: "examen", level: levelId });
    examBtn.className = "button button-featured";
    examBtn.textContent = "Examen complet";

    examMeta.className = "choice-featured-note";

    examListNode.innerHTML = "";
    examListNode.appendChild(examBtn);
    examListNode.appendChild(examMeta);
  }

  var levelLabel = getLevelLabelNode();
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

  renderExamButton(examList, level);
  if (themesList) renderThemeAccordion(themesList, level);
});
