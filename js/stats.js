const statsDiv = document.getElementById("stats");
const history = JSON.parse(localStorage.getItem("history")||"[]");

if(history.length===0){
  statsDiv.textContent="Aucun résultat enregistré.";
}else{
  let html="<ul>";
  history.forEach(h=>{
    html+=`<li>${h.score} / ${h.total}</li>`;
  });
  html+="</ul>";
  statsDiv.innerHTML = html;
}
