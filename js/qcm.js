App.dom.onReady(function () {
  var params = new URLSearchParams(window.location.search);
  var type = params.get("type");
  var theme = params.get("theme");
  var exam = params.get("exam");
  var levelParam = params.get("level");

  var questions = [];
  var current = 0;
  var userAnswers = [];

  var examLabels = {
    initiation: "Initiation",
    pluriannuelle: "Carte de séjour pluriannuelle",
    resident: "Carte de résident"
  };

  function getActiveLevel() {
    var stored = App.storage.getString("examLevel", "");
    return levelParam || stored || "";
  }

  function loadQuestions() {
    var level = getActiveLevel();
    if (type === "examen") {
      var header = App.dom.qs("header h1");
      var examLabel = examLabels[exam] || "Examen complet";
      if (header) header.textContent = "QCM - " + examLabel;
      App.storage.setString("examType", exam || "examen");
      App.storage.setString("examTypeLabel", examLabel);
      if (level) App.storage.setString("examLevel", level);

      loadExamQuestions(level)
        .then(function (data) {
          if (!data || data.length === 0) {
            redirectError("Aucune question trouvée pour ce niveau.", "Vérifiez les fichiers JS dans le dossier questions.");
            return;
          }
          var normalized = data.map(App.quiz.normalizeQuestion);
          questions = App.utils.shuffleArray(normalized).slice(0, 40);
          showQuestion();
        })
        .catch(function (e) {
          redirectError("Fichier d'examen introuvable.", e && e.message ? e.message : "");
        });
    } else if (type === "theme") {
      App.storage.remove("examType");
      App.storage.remove("examTypeLabel");
      if (level) App.storage.setString("examLevel", level);
      loadThemeQuestions(theme, level)
        .then(function (data) {
          if (!data || data.length === 0) {
            redirectError("Aucune question trouvée pour ce thème.", "Vérifiez le fichier JS du thème.");
            return;
          }
          questions = data.map(App.quiz.normalizeQuestion);
          showQuestion();
        })
        .catch(function (e) {
          redirectError("Fichier du thème introuvable.", e && e.message ? e.message : "");
        });
    }
  }

  function showQuestion() {
    if (current >= questions.length) {
      persistResults();
      window.location.href = "resultat.html";
      return;
    }

    var q = questions[current];
    App.dom.byId("question").textContent = q.question;
    var answersDiv = App.dom.byId("answers");
    answersDiv.innerHTML = "";

    (q.displayAnswers || q.answers).forEach(function (a) {
      var btn = document.createElement("button");
      btn.textContent = a.label;
      btn.classList.add("answer-btn");
      if ((userAnswers[current] || []).includes(a.id)) btn.classList.add("selected");
      btn.onclick = function () { selectAnswer(btn, a.id); };
      answersDiv.appendChild(btn);
    });

    App.dom.byId("counter").textContent = (current + 1) + " / " + questions.length;

    var nextBtn = App.dom.byId("nextBtn");
    var prevBtn = App.dom.byId("prevBtn");

    nextBtn.disabled = !(userAnswers[current] && userAnswers[current].length);
    nextBtn.onclick = function () { current++; showQuestion(); };
    prevBtn.disabled = current === 0;
    prevBtn.onclick = function () { current--; showQuestion(); };
  }

  function selectAnswer(btn, answerId) {
    var buttons = App.dom.qsa(".answer-btn");
    buttons.forEach(function (b) { b.classList.remove("selected"); });
    btn.classList.add("selected");
    userAnswers[current] = [answerId];
    App.dom.byId("nextBtn").disabled = !(userAnswers[current] && userAnswers[current].length);
  }

  function calculateScore() {
    var score = 0;
    questions.forEach(function (q, i) {
      var user = userAnswers[i] || [];
      var correct = q.correct || [];
      if (user.length === 1 && correct.includes(user[0])) score++;
    });
    return score;
  }

  function persistResults() {
    App.storage.setNumber("lastScore", calculateScore());
    App.storage.setNumber("totalQuestions", questions.length);
    App.storage.setJSON("questions", questions.map(function (q, i) {
      return Object.assign({}, q, {
        userAnswerIds: userAnswers[i] || []
      });
    }));

    var history = App.storage.getJSON("statsHistory", []);
    if (!Array.isArray(history)) history = [];
    history.push({
      date: new Date().toISOString(),
      score: calculateScore(),
      total: questions.length,
      type: App.storage.getString("examType", "qcm")
    });
    if (history.length > 50) history = history.slice(-50);
    App.storage.setJSON("statsHistory", history);
  }

  function loadExamQuestions(level) {
    if (!level) return Promise.reject(new Error("Niveau manquant"));
    var themeIds = typeof THEMES !== "undefined" ? THEMES.map(function (t) { return t.id; }) : [];
    if (themeIds.length === 0) return Promise.reject(new Error("Thèmes manquants"));

    var loads = themeIds.map(function (themeId) {
      return loadThemeQuestions(themeId, level).catch(function () { return []; });
    });
    return Promise.all(loads).then(function (parts) { return parts.flat(); });
  }

  function loadThemeQuestions(themeId, level) {
    if (!themeId || !level) return Promise.reject(new Error("Theme ou niveau manquant"));
    var code = typeof getLevelCode === "function" ? getLevelCode(level) : "";
    if (!code) return Promise.reject(new Error("Code niveau introuvable"));
    var varName = themeId + "_" + code;
    var path = "questions/" + code + "/" + themeId + "_" + code + ".js";
    return fetch(path)
      .then(function (r) {
        if (!r.ok) throw new Error("Fichier introuvable: " + path);
        return r.text();
      })
      .then(function (text) { return extractQuestionsFromScript(text, varName); });
  }

  function extractQuestionsFromScript(text, varName) {
    var trimmed = text.trim();
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      return JSON.parse(trimmed);
    }
    var fn = new Function(text + "; return (typeof " + varName + " !== \"undefined\") ? " + varName + " : null;");
    var data = fn();
    if (!data) throw new Error("Variable " + varName + " introuvable");
    return data;
  }

  function redirectError(message, details) {
    var msg = encodeURIComponent(message || "Erreur de chargement.");
    var det = encodeURIComponent(details || "");
    window.location.href = "error.html?message=" + msg + "&details=" + det;
  }

  loadQuestions();
});
