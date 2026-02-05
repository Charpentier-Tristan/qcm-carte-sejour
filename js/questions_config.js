const LEVELS = [
  { id: "initiation", label: "Initiation", code: "CI" },
  { id: "pluriannuelle", label: "Carte de séjour pluriannuelle", code: "CSP" },
  { id: "resident", label: "Carte de résident", code: "CR" }
];

const THEMES = [
  { id: "geographie", label: "Territoire et géographie" },
  { id: "principes_republique", label: "Principes de la République" },
  { id: "systeme_institutionnel", label: "Système institutionnel" },
  { id: "droits_devoirs", label: "Droits et devoirs" },
  { id: "histoire_geographie", label: "Histoire, géographie et culture" },
  { id: "vivre_societe", label: "Vivre dans la société française" }
];

function getLevelLabel(levelId) {
  const match = LEVELS.find(l => l.id === levelId);
  return match ? match.label : "";
}

function getLevelCode(levelId) {
  const match = LEVELS.find(l => l.id === levelId);
  return match ? match.code : "";
}

function buildThemeFile(themeId, levelId) {
  const code = getLevelCode(levelId);
  if (!code) return "";
  return `questions/${themeId}_${code}`;
}
