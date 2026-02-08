App.dom.onReady(function () {
  var params = new URLSearchParams(window.location.search);
  var message = params.get("message");
  var details = params.get("details");

  var messageEl = App.dom.byId("errorMessage");
  var detailsEl = App.dom.byId("errorDetails");

  if (message && messageEl) messageEl.textContent = decodeURIComponent(message);
  if (details && detailsEl) detailsEl.textContent = decodeURIComponent(details);
});
