const params = new URLSearchParams(window.location.search);
const message = params.get("message");
const details = params.get("details");

const messageEl = document.getElementById("errorMessage");
const detailsEl = document.getElementById("errorDetails");

if (message && messageEl) messageEl.textContent = decodeURIComponent(message);
if (details && detailsEl) detailsEl.textContent = decodeURIComponent(details);
