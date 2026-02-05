const params = new URLSearchParams(window.location.search);
const level = params.get("level");

const levelLabel = document.getElementById("levelLabel");
const levelHint = document.getElementById("levelHint");
const themesList = document.getElementById("themesList");
const examList = document.getElementById("examList");

if (!level) {
  levelLabel.textContent = "Niveau manquant";
  levelHint.textContent = "Veuillez choisir un niveau d'examen civique.";
} else {
  const label = typeof getLevelLabel === "function" ? getLevelLabel(level) : level;
  levelLabel.textContent = `Niveau : ${label}`;
  localStorage.setItem("examLevel", level);

  if (typeof THEMES !== "undefined") {
    THEMES.forEach(t => {
      const a = document.createElement("a");
      a.href = `qcm.html?type=theme&theme=${t.id}&level=${level}`;
      a.className = "button";
      a.textContent = t.label;
      themesList.appendChild(a);
    });
  }

  const examBtn = document.createElement("a");
  examBtn.href = `qcm.html?type=examen&level=${level}`;
  examBtn.className = "button";
  examBtn.textContent = "Examen complet";
  examList.appendChild(examBtn);
}
