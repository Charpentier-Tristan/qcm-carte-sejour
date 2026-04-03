App.dom.onReady(function () {
  var COURSE_BASE_URL = "https://cart-trieves.org/videos/";
  var FALLBACK_COURSE_GROUPS = [
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
  ];
  var COURSE_GROUPS = App.data && Array.isArray(App.data.COURSE_GROUPS)
    ? App.data.COURSE_GROUPS
    : FALLBACK_COURSE_GROUPS;

  var COURSE_IDS = COURSE_GROUPS.reduce(function (all, group) {
    return all.concat(group.ids);
  }, []);

  var COURSE_LABELS = {
    ancienregime: "Ancien Régime",
    arrivee: "Venir en France",
    banque: "Compte bancaire",
    causesrevolution: "Causes de la Révolution",
    chronologie: "Chronologie",
    cinquieme: "Cinquième République",
    colonialisme: "Colonialisme",
    construction: "Construction européenne",
    esclavage: "Esclavage",
    europe: "Institutions européennes",
    geographie: "Géographie",
    guerres: "Guerres Mondiales",
    ideesrecues: "Idées reçues",
    institutions: "Institutions de la République",
    laicite: "Laïcité",
    logement: "Logement",
    lumieres: "Pensée des Lumières",
    napoleon: "Napoléon Ier",
    permis: "Permis de conduire",
    principes: "Principes de la République",
    raison: "Rationalisme",
    sante: "Soins de santé",
    travail: "Travailler en France",
    troisieme: "Troisième République"
  };

  function getCourseLabel(courseId) {
    return COURSE_LABELS[courseId] || courseId;
  }

  function getRequestedThemeKey() {
    var params = new URLSearchParams(window.location.search);
    return params.get("theme") || "";
  }

  function getVisibleGroups() {
    var requestedThemeKey = getRequestedThemeKey();
    var matchingGroup = COURSE_GROUPS.find(function (group) {
      return group.key === requestedThemeKey;
    });
    return matchingGroup ? [matchingGroup] : COURSE_GROUPS;
  }

  function buildVideoUrl(courseId) {
    return COURSE_BASE_URL + courseId + "_video.mp4";
  }

  function buildPdfUrl(courseId) {
    return COURSE_BASE_URL + courseId + "_texte.pdf";
  }

  function buildQcmUrl(courseId) {
    return "qcm.html?type=theme&theme=" + encodeURIComponent(courseId) + "&level=video";
  }

  function updateSelectedCourseLink(courseId) {
    if (!courseId || courseId === "undefined") return;
    var params = new URLSearchParams(window.location.search);
    params.set("course", courseId);
    var nextUrl = window.location.pathname + "?" + params.toString();
    window.history.replaceState({}, "", nextUrl);
  }

  function markActiveCourse(activeId) {
    App.dom.qsa(".course-link").forEach(function (link) {
      var isActive = link.dataset.courseId === activeId;
      link.classList.toggle("active", isActive);
      link.setAttribute("aria-current", isActive ? "page" : "false");
    });
  }

  function updateThemePresentation(visibleGroups) {
    var headerSubtitle = App.dom.byId("courseThemeLabel");
    var listTitle = App.dom.byId("courseListTitle");
    var heroText = App.dom.byId("courseHeroText");

    if (visibleGroups.length === 1) {
      if (headerSubtitle) headerSubtitle.textContent = visibleGroups[0].title;
      if (listTitle) listTitle.textContent = visibleGroups[0].title;
      if (heroText) heroText.textContent = "Choisissez un cours de ce théme pour regarder la video et ouvrir la fiche PDF associee.";
      return;
    }

    if (headerSubtitle) headerSubtitle.textContent = "Videos et fiches de revision";
    if (listTitle) listTitle.innerHTML = "Th&egrave;mes des cours";
    if (heroText) heroText.textContent = "Choisissez un cours dans la liste pour regarder la video et ouvrir la fiche PDF associee.";
  }

  function renderCourse(courseId) {
    var viewer = App.dom.byId("courseViewer");
    var video = App.dom.byId("courseVideo");
    var qcmLink = App.dom.byId("courseQcmLink");
    var videoLink = App.dom.byId("courseVideoLink");
    var pdfLink = App.dom.byId("coursePdfLink");
    var title = App.dom.byId("courseTitle");
    if (!courseId || courseId === "undefined") return;

    var courseTitle = getCourseLabel(courseId);
    var qcmUrl = buildQcmUrl(courseId);
    var videoUrl = buildVideoUrl(courseId);
    var pdfUrl = buildPdfUrl(courseId);

    if (!viewer || !video || !qcmLink || !videoLink || !pdfLink) return;

    if (title) title.textContent = courseTitle;
    video.src = videoUrl;
    video.setAttribute("aria-label", "Video du cours " + courseTitle);
    qcmLink.href = qcmUrl;
    videoLink.href = videoUrl;
    pdfLink.href = pdfUrl;

    markActiveCourse(courseId);
    updateSelectedCourseLink(courseId);
  }

  function enableSingleOpenBehavior(container) {
    container.addEventListener("toggle", function (event) {
      var opened = event.target;
      if (!opened || opened.tagName !== "DETAILS" || !opened.open) return;
      container.querySelectorAll("details.course-accordion-section").forEach(function (node) {
        if (node !== opened) node.open = false;
      });
    }, true);
  }

  function renderCourseGroup(group, useAccordion, isOpenByDefault) {
    var section = document.createElement(useAccordion ? "details" : "section");
    var heading = document.createElement("h3");
    var list = document.createElement("div");

    section.className = useAccordion ? "course-accordion-section" : "course-group";
    if (useAccordion) section.open = !!isOpenByDefault;
    heading.className = useAccordion ? "course-accordion-title" : "course-group-title";
    heading.textContent = group.title;
    list.className = useAccordion ? "course-accordion-list" : "course-group-list";

    group.ids.forEach(function (courseId) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "course-link";
      button.dataset.courseId = courseId;
      button.textContent = getCourseLabel(courseId);
      button.addEventListener("click", function () {
        renderCourse(courseId);
      });
      list.appendChild(button);
    });

    if (useAccordion) {
      var summary = document.createElement("summary");
      summary.appendChild(heading);
      section.appendChild(summary);
    } else {
      section.appendChild(heading);
    }
    section.appendChild(list);
    return section;
  }

  function renderCourseList(visibleGroups) {
    var container = App.dom.byId("courseList");
    if (!container) return;

    container.innerHTML = "";
    var useAccordion = visibleGroups.length > 1;

    visibleGroups.forEach(function (group, index) {
      container.appendChild(renderCourseGroup(group, useAccordion, index === 0));
    });

    if (useAccordion) enableSingleOpenBehavior(container);
  }

  function getInitialCourseId(visibleGroups) {
    var params = new URLSearchParams(window.location.search);
    var requested = params.get("course");
    if (requested === "undefined") requested = "";
    var visibleIds = visibleGroups.reduce(function (all, group) {
      return all.concat(group.ids);
    }, []);

    if (requested && visibleIds.indexOf(requested) >= 0 && COURSE_IDS.indexOf(requested) >= 0) {
      return requested;
    }
    return visibleIds[0] || COURSE_IDS[0];
  }

  var visibleGroups = getVisibleGroups();
  if (!visibleGroups.length) {
    visibleGroups = FALLBACK_COURSE_GROUPS;
  }
  updateThemePresentation(visibleGroups);
  renderCourseList(visibleGroups);
  renderCourse(getInitialCourseId(visibleGroups));
});
