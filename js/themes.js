const themes = [
  { id: "principes_republique", name: "Principes et valeurs de la République" },
  { id: "systeme_institutionnel", name: "Système institutionnel et politique" },
  { id: "droits_devoirs", name: "Droits et devoirs" },
  { id: "histoire_geographie", name: "Histoire, géographie et culture" },
  { id: "vivre_societe", name: "Vivre dans la société française" }
];

const container = document.getElementById("themesList");

themes.forEach(t => {
  const div = document.createElement("div");
  div.className = "card center";
  div.innerHTML = `
    <h2>${t.name}</h2>
    <a href="qcm.html?type=theme&theme=${t.id}" class="button">Commencer</a>
  `;
  container.appendChild(div);
});
