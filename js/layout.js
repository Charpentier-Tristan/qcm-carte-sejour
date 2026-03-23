App.dom.onReady(function () {
  function getParentUrl() {
    var path = window.location.pathname || "";
    var file = path.split("/").pop() || "";
    var params = new URLSearchParams(window.location.search);
    var level = params.get("level") || App.storage.getString("examLevel", "");
    var activeQuizUrl = App.storage.getString("activeQuizUrl", "");

    if (/choix\.html?$/.test(file)) {
      return "index.html";
    }

    if (/qcm\.html?$/.test(file)) {
      return level ? ("choix.html?level=" + encodeURIComponent(level)) : "index.html";
    }

    if (/resultat\.html?$/.test(file)) {
      return activeQuizUrl || (level ? ("choix.html?level=" + encodeURIComponent(level)) : "index.html");
    }

    return "index.html";
  }

  var headerEl = App.dom.byId("app-header");
  if (headerEl) {
    var title = headerEl.dataset.title || "";
    var subtitle = headerEl.dataset.subtitle || "";
    var subtitleId = headerEl.dataset.subtitleId || "";
    var subtitleAttr = subtitleId ? ' id="' + App.utils.escapeHtml(subtitleId) + '"' : "";
    var isHome = /index\.html?$/.test(window.location.pathname) || window.location.pathname.endsWith("/");
    var isError = /error\.html?$/.test(window.location.pathname) || window.location.pathname.endsWith("/");
    var breadcrumbEnabled = headerEl.dataset.breadcrumb !== "false";
    var currentUrl = window.location.pathname + window.location.search;
    headerEl.innerHTML = `
      <div class="header-nav">
        ${isHome || isError ? "" : `<button class="nav-back" type="button" aria-label="Retour">Retour</button>`}
      </div>
      <h1>
        <a class="home-link brand-lockup" href="index.html">
          <span class="brand-mark">
            <img class="brand-logo" src="assets/logo-fca.svg" alt="" width="52" height="52">
          </span>
          <span>${App.utils.escapeHtml(title)}</span>
        </a>
      </h1>
      ${subtitle ? `<h2${subtitleAttr}>${App.utils.escapeHtml(subtitle)}</h2>` : ""}
      <nav class="breadcrumb" aria-label="Chemin de navigation"></nav>
    `;

    if (!isHome && !isError) {
      var backBtn = headerEl.querySelector(".nav-back");
      if (backBtn) {
        backBtn.addEventListener("click", function () {
          window.location.href = getParentUrl();
        });
      }
    }

    var breadcrumbEl = headerEl.querySelector(".breadcrumb");
    if (breadcrumbEl && breadcrumbEnabled) {
      if (isHome) {
        sessionStorage.removeItem("breadcrumbs");
        breadcrumbEl.innerHTML = "<span class=\"crumb current\">Accueil</span>";
      } else if (!isError) {
        var homeCrumb = { title: "Accueil", url: "index.html" };
        var crumbs = [];
        try {
          var raw = sessionStorage.getItem("breadcrumbs");
          if (raw) crumbs = JSON.parse(raw);
        } catch (_) {
          crumbs = [];
        }

        var isSameOriginRef = document.referrer && document.referrer.startsWith(window.location.origin);
        if (!isSameOriginRef) {
          crumbs = [];
        }

        var existingIndex = crumbs.findIndex(function (c) { return c.url === currentUrl; });
        if (existingIndex >= 0) {
          crumbs = crumbs.slice(0, existingIndex + 1);
        } else {
          crumbs.push({ title: title || "Page", url: currentUrl });
        }

        if (!crumbs.length || crumbs[0].url !== homeCrumb.url) {
          if (isHome) {
            crumbs = [homeCrumb];
          } else {
            crumbs.unshift(homeCrumb);
          }
        }

        var maxCrumbs = 4;
        if (crumbs.length > maxCrumbs) {
          crumbs = [crumbs[0]].concat(crumbs.slice(-(maxCrumbs - 1)));
        }

        sessionStorage.setItem("breadcrumbs", JSON.stringify(crumbs));

        breadcrumbEl.innerHTML = crumbs.map(function (c, i) {
          var label = App.utils.escapeHtml(c.title);
          if (i === crumbs.length - 1) {
            return "<span class=\"crumb current\">" + label + "</span>";
          }
          return "<a class=\"crumb\" href=\"" + App.utils.escapeHtml(c.url) + "\">" + label + "</a><span class=\"crumb-sep\">&rsaquo;</span>";
        }).join("");
      }
    } else if (breadcrumbEl) {
      breadcrumbEl.innerHTML = "";
    }
  }

  var footerEl = App.dom.byId("app-footer");
  if (footerEl) {
    var isMobile = window.matchMedia && window.matchMedia("(max-width: 600px)").matches;
    var contactLink = isMobile ? "" : "<span class=\"footer-sep\">|</span><a href=\"contact.html\" class=\"button\">Contact</a>";
    footerEl.innerHTML = `
      <p>
        <a href="mentions-legales.html" class="button">Mentions l&eacute;gales</a>
        ${contactLink}
        <span class="footer-sep">|</span>
        <a href="stats.html" class="button">Statistiques</a>
      </p>
    `;
  }
});
