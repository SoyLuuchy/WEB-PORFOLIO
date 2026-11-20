function actualizarHora() {
    const ahora = new Date();

    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    const segundos = String(ahora.getSeconds()).padStart(2, "0");

    const reloj = document.getElementById("reloj");

    if (reloj) {
        reloj.textContent = horas + ":" + minutos + ":" + segundos;
    }

    if (!temaManual) {
        ponerTema(!(ahora.getHours() >= 8 && ahora.getHours() < 20));
    }
}

function ponerTema(esNoche) {
    document.body.classList.toggle("noche", esNoche);

    const boton = document.getElementById("cambiar-tema");

    if (boton) {
        boton.textContent = esNoche ? "Cambiar a modo día" : "Cambiar a modo noche";
        boton.setAttribute("aria-pressed", esNoche ? "true" : "false");
    }
}

let temaManual = false;

try {
    const temaGuardado = localStorage.getItem("tema-portfolio");

    if (temaGuardado === "dia" || temaGuardado === "noche") {
        temaManual = true;
        ponerTema(temaGuardado === "noche");
    }
} catch (error) {
    // Si el navegador bloquea el almacenamiento, se usa el tema automático.
}

const botonTema = document.getElementById("cambiar-tema");

if (botonTema) {
    botonTema.addEventListener("click", function () {
        const esNoche = !document.body.classList.contains("noche");

        temaManual = true;
        ponerTema(esNoche);

        try {
            localStorage.setItem("tema-portfolio", esNoche ? "noche" : "dia");
        } catch (error) {
            // El cambio de tema sigue funcionando aunque no se pueda guardar.
        }
    });
}

actualizarHora();
setInterval(actualizarHora, 1000);
