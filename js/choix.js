App.dom.onReady(function () {
  var params = new URLSearchParams(window.location.search);
  var level = params.get("level");

  var THEME_SECTIONS = [
    {
      title: "Principes et valeurs de la République",
      items: [
        { label: "Devise et symboles", id: "symboles" },
        { label: "Laïcité", id: "laique" },
        { label: "Mises en situation", id: "situationpv" }
      ]
    },
    {
      title: "Système institutionnel et politique",
      items: [
        { label: "Démocratie et droit de vote", id: "vote" },
        { label: "Organisation de la République", id: "orgarep" },
        { label: "Institutions européennes", id: "insteurope" }
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
      title: "Histoire géographie et culture",
      items: [
        { label: "Périodes et personnages historiques", id: "periodes" },
        { label: "Territoire et géographie", id: "territoire" },
        { label: "Patrimoine français", id: "patrimoine" }
      ]
    },
    {
      title: "Vivre dans la société française",
      items: [
        { label: "S'installer et résider en France", id: "resider" },
        { label: "L'accès aux soins", id: "soins" },
        { label: "Travailler en France", id: "travailler" },
        { label: "Autorité parentale et système éducatif", id: "parent" }
      ]
    }
  ];

  function getLevelLabelNode() {
    var node = App.dom.byId("levelLabel");
    if (node) return node;
    var header = App.dom.byId("app-header");
    return header ? header.querySelector("h2") : null;
  }

  function renderThemeLink(item, levelId) {
    var link = document.createElement("a");

    link.className = "theme-accordion-link";
    link.href = "qcm.html?type=theme&theme=" + item.id + "&level=" + levelId;
    link.innerHTML = "<span>" + item.label + "</span>";

    return link;
  }

  function renderSection(section, levelId, isOpenByDefault) {
    var details = document.createElement("details");
    var summary = document.createElement("summary");
    var list = document.createElement("div");

    details.className = "theme-accordion-section";
    details.open = !!isOpenByDefault;

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

    THEME_SECTIONS.forEach(function (section, index) {
      accordion.appendChild(renderSection(section, levelId, index === 0));
    });

    enableSingleOpenBehavior(accordion);
    themesListNode.innerHTML = "";
    themesListNode.appendChild(accordion);
  }

  function renderExamButton(examListNode, levelId) {
    if (!examListNode) return;
    var examBtn = document.createElement("a");
    examBtn.href = "qcm.html?type=examen&level=" + levelId;
    examBtn.className = "button";
    examBtn.textContent = "Examen complet";
    examListNode.innerHTML = "";
    examListNode.appendChild(examBtn);
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

  if (themesList) renderThemeAccordion(themesList, level);
  renderExamButton(examList, level);
});
