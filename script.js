
function actualizarHora() {
    const ahora = new Date();

    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    const segundos = String(ahora.getSeconds()).padStart(2, "0");

    document.getElementById("reloj").textContent =
        `${horas}:${minutos}:${segundos}`;

    if (ahora.getHours() >= 8 && ahora.getHours() < 20) {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    } else {
        document.body.style.backgroundColor = "#020a14";
        document.body.style.color = "white";
    }
}

setInterval(actualizarHora, 1000);
actualizarHora();