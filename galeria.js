const pista = document.querySelector(".fotos");
const anterior = document.querySelector(".anterior");
const siguiente = document.querySelector(".siguiente");
const carpeta = new URL(".", pista.firstElementChild.src);

// Cada sesión guarda sus JPG en orden: 01.jpg, 02.jpg, 03.jpg...
async function cargarFotos() {
  for (let numero = 2; ; numero++) {
    const foto = new Image();
    const nombre = String(numero).padStart(2, "0") + ".jpg";
    foto.src = new URL(nombre, carpeta).href;
    foto.alt = pista.closest("section").getAttribute("aria-label") + ", foto " + numero;
    try {
      await foto.decode();
    } catch {
      return;
    }
    pista.append(foto);
    anterior.hidden = false;
    siguiente.hidden = false;
  }
}

function mover(paso) {
  const total = pista.children.length;
  const actual = Math.round(pista.scrollLeft / pista.clientWidth);
  const destino = (actual + paso + total) % total;
  pista.scrollTo({ left: destino * pista.clientWidth });
}

anterior.onclick = () => mover(-1);
siguiente.onclick = () => mover(1);
pista.onkeydown = (evento) => {
  if (evento.key === "ArrowLeft" || evento.key === "ArrowRight") {
    evento.preventDefault();
    mover(evento.key === "ArrowLeft" ? -1 : 1);
  }
};

cargarFotos();
