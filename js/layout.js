App.dom.onReady(function () {
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
      <h1><a class="home-link" href="index.html">${App.utils.escapeHtml(title)}</a></h1>
      ${subtitle ? `<h2${subtitleAttr}>${App.utils.escapeHtml(subtitle)}</h2>` : ""}
      <nav class="breadcrumb" aria-label="Chemin de navigation"></nav>
    `;

    if (!isHome || ! isError) {
      var backBtn = headerEl.querySelector(".nav-back");
      if (backBtn) {
        backBtn.addEventListener("click", function () {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.location.href = "index.html";
          }
        });
      }
    }

    var breadcrumbEl = headerEl.querySelector(".breadcrumb");
    if (breadcrumbEl && breadcrumbEnabled) {
      if (isHome) {
        sessionStorage.removeItem("breadcrumbs");
        breadcrumbEl.innerHTML = "<span class=\"crumb current\">Accueil</span>";
      } else if (!isError){
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
          crumbs = [crumbs[0]].concat(crumbs.slice(- (maxCrumbs - 1)));
        }

        sessionStorage.setItem("breadcrumbs", JSON.stringify(crumbs));

        breadcrumbEl.innerHTML = crumbs.map(function (c, i) {
          var label = App.utils.escapeHtml(c.title);
          if (i === crumbs.length - 1) {
            return "<span class=\"crumb current\">" + label + "</span>";
          }
          return "<a class=\"crumb\" href=\"" + App.utils.escapeHtml(c.url) + "\">" + label + "</a><span class=\"crumb-sep\">›</span>";
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
        <a href="mentions-legales.html" class="button">Mentions légales</a>
        ${contactLink}
        <span class="footer-sep">|</span>
        <a href="stats.html" class="button">Statistiques</a>
      </p>
    `;
  }
});
