window.App = window.App || {};

App.storage = {
  getString: function (key, fallback) {
    var value = localStorage.getItem(key);
    return value === null ? (fallback || "") : value;
  },
  setString: function (key, value) {
    localStorage.setItem(key, String(value));
  },
  getNumber: function (key, fallback) {
    var value = parseInt(localStorage.getItem(key) || "", 10);
    return Number.isNaN(value) ? (fallback || 0) : value;
  },
  setNumber: function (key, value) {
    localStorage.setItem(key, String(value));
  },
  getJSON: function (key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  },
  setJSON: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: function (key) {
    localStorage.removeItem(key);
  }
};
