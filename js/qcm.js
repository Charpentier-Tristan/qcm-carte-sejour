App.dom.onReady(function () {
  var params = new URLSearchParams(window.location.search);
  var controller = App.qcm.createController({
    type: params.get("type") || "",
    theme: params.get("theme") || "",
    exam: params.get("exam") || "",
    levelParam: params.get("level") || "",
    restartRequested: params.get("restart") === "1"
  });

  controller.start();
});
