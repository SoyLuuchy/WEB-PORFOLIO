const boton = document.querySelector("#tema");
const reloj = document.querySelector("#reloj");
const formato = new Intl.DateTimeFormat("es", { timeStyle: "medium" });
let preferencia;

try { preferencia = localStorage.getItem("tema-portfolio"); } catch {}

function actualizar() {
  const ahora = new Date();
  const hora = ahora.getHours();
  const noche = preferencia === "noche" || (preferencia !== "dia" && (hora < 8 || hora >= 20));
  const tema = noche ? "noche" : "dia";
  if (document.documentElement.dataset.tema !== tema) {
    document.documentElement.dataset.tema = tema;
    boton.textContent = noche ? "Cambiar a modo día" : "Cambiar a modo noche";
  }
  reloj.textContent = formato.format(ahora);
}

boton.addEventListener("click", () => {
  preferencia = document.documentElement.dataset.tema === "noche" ? "dia" : "noche";
  try { localStorage.setItem("tema-portfolio", preferencia); } catch {}
  actualizar();
});

actualizar();
boton.hidden = reloj.parentElement.hidden = false;
setInterval(actualizar, 1000);
