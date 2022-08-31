//
const fondoCells = [];

//Incrementar dependiendo del tamaño de la tabla (también agregar el id en el CSS)
//Renglones     ↓
let renglones = 12 * 2;

for (let cellId = 0; cellId < renglones; cellId++) {
  fondoCells.push(document.getElementById('test' + cellId));
}

function tieneFocus(x) {
  fondoCells[x].style.background = 'rgb(0, 0, 0)';
  fondoCells[x + 1].style.color = 'rgb(255, 255, 255)';
}

function noTieneFocus(x) {
  fondoCells[x].style.background = 'rgb(211, 211, 211)';
  fondoCells[x + 1].style.color = 'rgb(0, 0, 255)';
}

for (let i = 0; i < fondoCells.length; i += 2) {
  fondoCells[i].addEventListener("mouseover", () => {tieneFocus(i);}, false);
  fondoCells[i].addEventListener("mouseleave", () => {noTieneFocus(i);}, false);
}