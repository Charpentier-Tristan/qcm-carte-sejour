window.App = window.App || {};

App.quiz = {
  normalizeAnswers: function (q) {
    if (!Array.isArray(q.answers)) return [];
    if (q.answers.length === 0) return [];
    if (typeof q.answers[0] === "string") {
      return q.answers.map(function (label, i) {
        return { id: String(i), label: label };
      });
    }
    return q.answers.map(function (a) {
      return { id: String(a.id), label: a.label };
    });
  },
  normalizeCorrect: function (q, answers) {
    if (Array.isArray(q.correct)) {
      return q.correct.map(function (id) { return String(id); });
    }
    if (typeof q.correct === "number") {
      return [String(q.correct)];
    }
    if (typeof q.correct === "string") {
      return [q.correct];
    }
    return answers.length === 1 ? [answers[0].id] : [];
  },
  buildDisplayAnswers: function (answers, correct) {
    var correctSet = new Set(correct);
    var correctAnswers = answers.filter(function (a) { return correctSet.has(a.id); });
    if (correctAnswers.length >= 1) {
      var displayedCorrect = correctAnswers[Math.floor(Math.random() * correctAnswers.length)];
      var wrongAnswers = answers.filter(function (a) { return !correctSet.has(a.id); });
      var pickedWrong = App.utils.shuffleArray(wrongAnswers).slice(0, 3);
      var displayAnswers = [displayedCorrect].concat(pickedWrong);

      if (displayAnswers.length < 4) {
        var extraCorrect = correctAnswers.filter(function (a) { return a.id !== displayedCorrect.id; });
        var needed = 4 - displayAnswers.length;
        var pickedExtra = App.utils.shuffleArray(extraCorrect).slice(0, needed);
        displayAnswers = displayAnswers.concat(pickedExtra);
      }

      displayAnswers = App.utils.shuffleArray(displayAnswers).slice(0, 4);
      return {
        displayAnswers: displayAnswers,
        displayCorrect: [displayedCorrect.id]
      };
    }
    return {
      displayAnswers: App.utils.shuffleArray(answers),
      displayCorrect: correct
    };
  },
  normalizeQuestion: function (q) {
    var answers = App.quiz.normalizeAnswers(q);
    var correct = App.quiz.normalizeCorrect(q, answers);
    var questionText = Array.isArray(q.question) ? (q.question[0] || "") : q.question;
    var display = App.quiz.buildDisplayAnswers(answers, correct);
    return Object.assign({}, q, {
      question: questionText,
      answers: answers,
      displayAnswers: display.displayAnswers,
      displayCorrect: display.displayCorrect,
      correct: correct,
      type: "single"
    });
  },
  labelsFor: function (q, ids) {
    if (!ids || ids.length === 0) return "—";
    var answers = App.quiz.normalizeAnswers(q);
    var map = new Map(answers.map(function (a) { return [a.id, a.label]; }));
    return ids.map(function (id) {
      var key = String(id);
      return map.get(key) || key;
    }).join(", ");
  }
};
