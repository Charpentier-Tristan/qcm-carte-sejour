window.App = window.App || {};

App.dom = {
  byId: function (id) {
    return document.getElementById(id);
  },
  qs: function (selector, root) {
    return (root || document).querySelector(selector);
  },
  qsa: function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  },
  onReady: function (fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }
};

App.utils = {
  escapeHtml: function (value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },
  shuffleArray: function (arr) {
    var copy = arr.slice();
    for (var position = copy.length; position > 0; position--) {
      var randomIndex = Math.floor(Math.random() * position);
      var temp = copy[position - 1];
      copy[position - 1] = copy[randomIndex];
      copy[randomIndex] = temp;
    }
    return copy;
  }
};
