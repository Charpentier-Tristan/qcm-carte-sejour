App.dom.onReady(function () {

  var headerEl = App.dom.byId("app-header");
  if (headerEl) {
    var title = headerEl.dataset.title || "";
    headerEl.innerHTML = `
      <a class="header-help-link" href="aide.html" title="Aide" aria-label="Aide">
        <img class="header-help-icon" src="assets/circle-question.svg" alt="" width="26" height="26">
      </a>
      <h1>
        <a class="home-link brand-lockup" href="index.html">
          <span class="brand-mark">
            <img class="brand-logo" src="assets/logo_fca.png" alt="" width="52" height="52">
          </span>
          <span class="header-title-text">${App.utils.escapeHtml(title)}</span>
        </a>
      </h1>
    `;
  }

  var footerEl = App.dom.byId("app-footer");
  if (footerEl) {
    var isMobile = window.matchMedia && window.matchMedia("(max-width: 600px)").matches;
    var contactLink = isMobile ? "" : "<span class=\"footer-sep\">|</span><a href=\"contact.html\" class=\"button\">Contact</a>";
    footerEl.innerHTML = `
      <p>
        <a href="notice.html" class="button">Notice</a>
        ${contactLink}
        <span class="footer-sep">|</span>
        <a href="stats.html" class="button">Statistiques</a>
      </p>
    `;
  }
});
