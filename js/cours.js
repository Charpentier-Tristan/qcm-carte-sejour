App.dom.onReady(function () {
  var COURSE_BASE_URL = "https://cart-trieves.org/videos/";
  var COURSE_IDS = [
    "ancienregime",
    "arrivee",
    "banque",
    "causesrevolution",
    "chronologie",
    "cinquieme",
    "colonialisme",
    "construction",
    "esclavage",
    "europe",
    "geographie",
    "guerres",
    "ideesrecues",
    "institutions",
    "laicite",
    "logement",
    "lumieres",
    "napoleon",
    "permis",
    "principes",
    "raison",
    "sante",
    "travail",
    "troisieme"
  ];

  var COURSE_LABELS = {
    ancienregime: "L'Ancien Regime",
    arrivee: "Arrivee en France",
    banque: "Banque",
    causesrevolution: "Causes de la Revolution",
    chronologie: "Chronologie",
    cinquieme: "Cinquieme Republique",
    colonialisme: "Colonialisme",
    construction: "Construction europeenne",
    esclavage: "Esclavage",
    europe: "Europe",
    geographie: "Geographie",
    guerres: "Les guerres",
    ideesrecues: "Idees recues",
    institutions: "Institutions",
    laicite: "Laicite",
    logement: "Logement",
    lumieres: "Les Lumieres",
    napoleon: "Napoleon",
    permis: "Permis",
    principes: "Principes",
    raison: "La raison",
    sante: "Sante",
    travail: "Travail",
    troisieme: "Troisieme Republique"
  };

  function getCourseLabel(courseId) {
    return COURSE_LABELS[courseId] || courseId;
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

  function renderCourse(courseId) {
    var emptyState = App.dom.byId("courseEmptyState");
    var viewer = App.dom.byId("courseViewer");
    var title = App.dom.byId("courseTitle");
    var video = App.dom.byId("courseVideo");
    var qcmLink = App.dom.byId("courseQcmLink");
    var videoLink = App.dom.byId("courseVideoLink");
    var pdfLink = App.dom.byId("coursePdfLink");
    var courseTitle = getCourseLabel(courseId);
    var qcmUrl = buildQcmUrl(courseId);
    var videoUrl = buildVideoUrl(courseId);
    var pdfUrl = buildPdfUrl(courseId);

    if (!emptyState || !viewer || !title || !video || !qcmLink || !videoLink || !pdfLink) return;

    title.textContent = courseTitle;
    video.src = videoUrl;
    video.setAttribute("aria-label", "Video du cours " + courseTitle);
    qcmLink.href = qcmUrl;
    videoLink.href = videoUrl;
    pdfLink.href = pdfUrl;

    emptyState.hidden = true;
    viewer.hidden = false;
    markActiveCourse(courseId);
    updateSelectedCourseLink(courseId);
  }

  function renderCourseList() {
    var container = App.dom.byId("courseList");
    if (!container) return;

    container.innerHTML = "";

    COURSE_IDS.forEach(function (courseId) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "course-link";
      button.dataset.courseId = courseId;
      button.textContent = getCourseLabel(courseId);
      button.addEventListener("click", function () {
        renderCourse(courseId);
      });
      container.appendChild(button);
    });
  }

  function getInitialCourseId() {
    var params = new URLSearchParams(window.location.search);
    var requested = params.get("course");
    if (requested && COURSE_IDS.indexOf(requested) >= 0) return requested;
    return COURSE_IDS[0];
  }

  renderCourseList();
  renderCourse(getInitialCourseId());
});
