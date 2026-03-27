window.App = window.App || {};

App.qcm = {
  createController: function (options) {
    var config = {
      type: options.type || "",
      theme: options.theme || "",
      exam: options.exam || "",
      levelParam: options.levelParam || "",
      restartRequested: !!options.restartRequested
    };

    var QUIZ_STATE_KEY = "activeQuizState";
    var EXAM_TOTAL_QUESTIONS = App.data.EXAM_THEME_DISTRIBUTION.reduce(function (sum, item) {
      return sum + item.count;
    }, 0);

    var state = {
      questions: [],
      current: 0,
      userAnswers: []
    };

    var COURSE_LABELS = {
      ancienregime: "Ancien Régime",
      arrivee: "Venir en France",
      banque: "Compte bancaire",
      causesrevolution: "Causes de la Révolution",
      chronologie: "Chronologie",
      cinquieme: "Cinquième République",
      colonialisme: "Colonialisme",
      construction: "Construction europeenne",
      esclavage: "Esclavage",
      europe: "Institutions européennes",
      geographie: "Géographie",
      guerres: "Guerres mondiales",
      ideesrecues: "Idées reçues",
      institutions: "Institutions de la République",
      laicite: "Laïcité",
      logement: "Logement",
      lumieres: "Pensée des Lumières",
      napoleon: "Napoléon Ier",
      permis: "Permis de conduire",
      principes: "Principes de la République",
      raison: "Rationalisme",
      sante: "Soins de sante",
      travail: "Travailler en France",
      troisieme: "Troisième République"
    };

    var dom = {
      headerTitle: App.dom.qs(".header-title-text"),
      question: App.dom.byId("question"),
      answers: App.dom.byId("answers"),
      counter: App.dom.byId("counter"),
      quizContext: App.dom.byId("quizContext"),
      nextBtn: App.dom.byId("nextBtn"),
      prevBtn: App.dom.byId("prevBtn")
    };

    function getActiveLevel() {
      return config.levelParam || App.storage.getString("examLevel", "");
    }

    function isExamQuiz() {
      return config.type === "examen";
    }

    function isThemeQuiz() {
      return config.type === "theme";
    }

    function isCourseQuiz() {
      return App.data.isCourseLevel(getActiveLevel());
    }

    function getQuestionLimit() {
      return isExamQuiz() ? EXAM_TOTAL_QUESTIONS : App.data.QUIZ_LIMITS.theme;
    }

    function getLevelLabelForDisplay() {
      var activeLevel = getActiveLevel();
      return App.data.getLevelLabel(activeLevel) || App.data.getExamLabel(activeLevel) || activeLevel;
    }

    function getDisplayThemeLabel(themeId) {
      var themeMatch = App.data && Array.isArray(App.data.THEMES)
        ? App.data.THEMES.find(function (item) { return item.id === themeId; })
        : null;

      if (themeMatch && themeMatch.label) return themeMatch.label;
      if (COURSE_LABELS[themeId]) return COURSE_LABELS[themeId];
      return themeId || "";
    }

    function getQuizContextParts(question) {
      var activeThemeId = (question && question.theme) || config.theme;
      var parts = [];

      if (isExamQuiz()) {
        parts.push("Examen complet");
        if (getLevelLabelForDisplay()) parts.push(getLevelLabelForDisplay());
        return parts;
      }

      if (isCourseQuiz()) {
        if (App.data.getCourseThemeLabel(activeThemeId)) parts.push(App.data.getCourseThemeLabel(activeThemeId));
        if (getDisplayThemeLabel(activeThemeId)) parts.push(getDisplayThemeLabel(activeThemeId));
        return parts;
      }

      if (getLevelLabelForDisplay()) parts.push(getLevelLabelForDisplay());
      if (getDisplayThemeLabel(activeThemeId)) parts.push(getDisplayThemeLabel(activeThemeId));
      return parts;
    }

    function buildQuizUrl() {
      var parts = [
        "type=" + encodeURIComponent(config.type),
        "level=" + encodeURIComponent(getActiveLevel())
      ];

      if (config.theme) parts.push("theme=" + encodeURIComponent(config.theme));
      if (config.exam) parts.push("exam=" + encodeURIComponent(config.exam));

      return "qcm.html?" + parts.join("&");
    }

    function buildQuizStateId() {
      return [
        config.type,
        config.theme,
        config.exam,
        getActiveLevel()
      ].join("|");
    }

    function updateQuizContext(question) {
      if (!dom.quizContext) return;
      dom.quizContext.textContent = getQuizContextParts(question).join(" | ");
    }

    function updateHeaderTitle() {
      if (!dom.headerTitle || !isExamQuiz()) return;
      dom.headerTitle.textContent = "quiz - " + App.data.getExamLabel(config.exam);
    }

    function saveQuizState(currentIndex) {
      if (!state.questions.length) return;

      App.storage.setString("activeQuizUrl", buildQuizUrl());
      App.storage.setJSON(QUIZ_STATE_KEY, {
        id: buildQuizStateId(),
        type: config.type,
        theme: config.theme,
        exam: config.exam,
        level: getActiveLevel(),
        current: Math.max(0, Math.min(currentIndex, state.questions.length - 1)),
        questions: state.questions,
        userAnswers: state.userAnswers
      });
    }

    function clearSavedQuizState() {
      App.storage.remove(QUIZ_STATE_KEY);
      App.storage.remove("activeQuizUrl");
    }

    function tryRestoreQuizState() {
      if (config.restartRequested) {
        clearSavedQuizState();
        return false;
      }

      var saved = App.storage.getJSON(QUIZ_STATE_KEY, null);
      if (!saved || saved.id !== buildQuizStateId()) return false;
      if (!Array.isArray(saved.questions) || !saved.questions.length) return false;

      state.questions = saved.questions;
      state.userAnswers = Array.isArray(saved.userAnswers) ? saved.userAnswers : [];
      state.current = typeof saved.current === "number" ? saved.current : 0;
      App.storage.setString("activeQuizUrl", buildQuizUrl());
      return true;
    }

    function normalizeLoadedQuestions(rawQuestions) {
      return (rawQuestions || []).map(App.quiz.normalizeQuestion);
    }

    function applyQuestionLimit(questions) {
      return App.utils.shuffleArray(questions).slice(0, getQuestionLimit());
    }

    function resetQuizState(questions) {
      state.questions = questions;
      state.current = 0;
      state.userAnswers = [];
      saveQuizState(0);
      renderCurrentQuestion();
    }

    function storeQuizMetadata() {
      var level = getActiveLevel();
      if (level) App.storage.setString("examLevel", level);

      if (isExamQuiz()) {
        App.storage.setString("examType", config.exam || "examen");
        App.storage.setString("examTypeLabel", App.data.getExamLabel(config.exam));
        return;
      }

      App.storage.remove("examType");
      App.storage.remove("examTypeLabel");
    }

    function handleLoadedQuestions(rawQuestions, emptyMessage, emptyDetails) {
      if (!rawQuestions || rawQuestions.length === 0) {
        redirectError(emptyMessage, emptyDetails);
        return;
      }

      resetQuizState(applyQuestionLimit(normalizeLoadedQuestions(rawQuestions)));
    }

    function renderAnswers(question) {
      dom.answers.innerHTML = "";

      (question.displayAnswers || question.answers).forEach(function (answer) {
        var button = document.createElement("button");
        var selectedAnswers = state.userAnswers[state.current] || [];

        button.type = "button";
        button.className = "answer-btn";
        button.textContent = answer.label;

        if (selectedAnswers.includes(answer.id)) {
          button.classList.add("selected");
        }

        button.onclick = function () {
          selectAnswer(answer.id);
        };

        dom.answers.appendChild(button);
      });
    }

    function updateCounter() {
      if (!dom.counter) return;
      dom.counter.textContent = (state.current + 1) + " / " + state.questions.length;
    }

    function hasCurrentAnswer() {
      return !!(state.userAnswers[state.current] && state.userAnswers[state.current].length);
    }

    function updateNavigationButtons() {
      var isFirstQuestion = state.current === 0;
      var isLastQuestion = state.current === state.questions.length - 1;

      dom.nextBtn.disabled = !hasCurrentAnswer();
      dom.nextBtn.textContent = isLastQuestion ? "Finir le test" : "Suivant";
      dom.nextBtn.onclick = function () {
        state.current += 1;
        saveQuizState(Math.min(state.current, state.questions.length - 1));
        renderCurrentQuestion();
      };

      dom.prevBtn.style.display = isFirstQuestion ? "none" : "";
      dom.prevBtn.disabled = isFirstQuestion;
      dom.prevBtn.onclick = function () {
        state.current -= 1;
        saveQuizState(state.current);
        renderCurrentQuestion();
      };
    }

    function finishQuiz() {
      persistResults();
      saveQuizState(state.questions.length - 1);
      window.location.href = "resultat.html";
    }

    function renderCurrentQuestion() {
      if (isThemeQuiz() && state.questions.length > App.data.QUIZ_LIMITS.theme) {
        state.questions = state.questions.slice(0, App.data.QUIZ_LIMITS.theme);
      }

      if (state.current >= state.questions.length) {
        finishQuiz();
        return;
      }

      var question = state.questions[state.current];
      dom.question.textContent = question.question;

      renderAnswers(question);
      updateCounter();
      updateQuizContext(question);
      updateNavigationButtons();
      saveQuizState(state.current);
    }

    function selectAnswer(answerId) {
      state.userAnswers[state.current] = [answerId];
      renderAnswers(state.questions[state.current]);
      dom.nextBtn.disabled = false;
      saveQuizState(state.current);
    }

    function calculateScore() {
      return state.questions.reduce(function (score, question, index) {
        var user = state.userAnswers[index] || [];
        var correct = question.correct || [];
        return user.length === 1 && correct.includes(user[0]) ? score + 1 : score;
      }, 0);
    }

    function persistResults() {
      var score = calculateScore();
      var history = App.storage.getJSON("statsHistory", []);
      var firstQuestion = state.questions[0] || null;
      var resultContext = getQuizContextParts(firstQuestion).join(" | ");

      App.storage.setNumber("lastScore", score);
      App.storage.setNumber("totalQuestions", state.questions.length);
      App.storage.setString("quizContextLabel", resultContext);
      App.storage.setJSON("questions", state.questions.map(function (question, index) {
        return Object.assign({}, question, {
          userAnswerIds: state.userAnswers[index] || []
        });
      }));

      if (!Array.isArray(history)) history = [];
      history.push({
        date: new Date().toISOString(),
        score: score,
        total: state.questions.length,
        type: App.storage.getString("examType", "qcm")
      });

      if (history.length > 50) {
        history = history.slice(-50);
      }

      App.storage.setJSON("statsHistory", history);
    }

    function loadExamQuestions(level) {
      if (!level) return Promise.reject(new Error("Niveau manquant"));

      var loads = App.data.EXAM_THEME_DISTRIBUTION.map(function (item) {
        return loadThemeQuestions(item.id, level)
          .then(function (questions) {
            return {
              id: item.id,
              count: item.count,
              questions: Array.isArray(questions) ? questions : []
            };
          })
          .catch(function () {
            return {
              id: item.id,
              count: item.count,
              questions: []
            };
          });
      });

      return Promise.all(loads).then(function (parts) {
        var missing = [];
        var selected = [];

        parts.forEach(function (part) {
          if (part.questions.length < part.count) {
            missing.push(part.id + " (" + part.questions.length + "/" + part.count + ")");
            return;
          }

          selected = selected.concat(App.utils.shuffleArray(part.questions).slice(0, part.count));
        });

        if (missing.length > 0) {
          throw new Error("Questions insuffisantes par theme: " + missing.join(", "));
        }

        return App.utils.shuffleArray(selected);
      });
    }

    function loadThemeQuestions(themeId, level) {
      if (!themeId || !level) {
        return Promise.reject(new Error("Theme ou niveau manquant"));
      }

      var code = App.data.getQuestionFileCode(level);
      if (!code) {
        return Promise.reject(new Error("Code de niveau introuvable"));
      }

      var variableName = themeId + "_" + code;
      var path = "questions/" + code + "/" + themeId + "_" + code + ".js";

      return fetch(path)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Fichier introuvable: " + path);
          }
          return response.text();
        })
        .then(function (text) {
          return extractQuestionsFromScript(text, variableName);
        });
    }

    function extractQuestionsFromScript(text, variableName) {
      var trimmed = text.trim();

      if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
        return JSON.parse(trimmed);
      }

      var fn = new Function(
        text + "; return (typeof " + variableName + " !== \"undefined\") ? " + variableName + " : null;"
      );
      var data = fn();

      if (!data) {
        throw new Error("Variable " + variableName + " introuvable");
      }

      return data;
    }

    function redirectError(message, details) {
      var query = [
        "message=" + encodeURIComponent(message || "Erreur de chargement."),
        "details=" + encodeURIComponent(details || "")
      ];
      window.location.href = "error.html?" + query.join("&");
    }

    function start() {
      storeQuizMetadata();
      updateHeaderTitle();

      if (tryRestoreQuizState()) {
        renderCurrentQuestion();
        return;
      }

      if (isExamQuiz()) {
        loadExamQuestions(getActiveLevel())
          .then(function (data) {
            handleLoadedQuestions(
              data,
              "Aucune question trouvee pour ce niveau.",
              "Verifiez les fichiers JS dans le dossier questions."
            );
          })
          .catch(function (error) {
            redirectError("Fichier d'examen introuvable.", error && error.message ? error.message : "");
          });
        return;
      }

      if (isThemeQuiz()) {
        loadThemeQuestions(config.theme, getActiveLevel())
          .then(function (data) {
            handleLoadedQuestions(
              data,
              "Aucune question trouvee pour ce theme.",
              "Verifiez le fichier JS du theme."
            );
          })
          .catch(function (error) {
            redirectError("Fichier du theme introuvable.", error && error.message ? error.message : "");
          });
      }
    }

    return {
      start: start
    };
  }
};
