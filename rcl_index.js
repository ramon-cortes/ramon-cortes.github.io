//
const fondoCells = [];
let id = [];

//Número de Renglones (celdas)
//                ↓
const numCeldas = 13;
let renglones = numCeldas * 2;

for (let cellId = 0; cellId < renglones; cellId++) {
  fondoCells.push(document.getElementById('test' + cellId));
}

//Convierte texto 'rgb(x, y, z)' en [x, y, z]
function convierteRgbNumeros(rgbTexto) {
  let rgbNumeros;
  rgbNumeros = rgbTexto.slice(4, rgbTexto.indexOf(')'));
  rgbNumeros = rgbNumeros.replaceAll(' ', '');
  rgbNumeros = rgbNumeros.split(',');

  for (let i = 0; i < 3; i++) {
    rgbNumeros[i] = parseInt(rgbNumeros[i]);
  }

  return rgbNumeros;
}

function tieneFocus(x) {
  clearTimeout(id[x]);
  fondoCells[x].style.background = 'rgb(0, 0, 0)';
  //fondoCells[x + 1].style.color = 'rgb(255, 255, 255)';
}

function noTieneFocus(x) {
  clearTimeout(id[x]);
  let colorActual = convierteRgbNumeros(fondoCells[x].style.background);

  for (let i = 0; i < 3; i++) {
    if (colorActual[i] <= 201) {
      colorActual[i] += 10;
    } else {
      colorActual[i] = 211;
    }
  }

  fondoCells[x].style.background = 'rgb(' + colorActual[0] + ',' + colorActual[1] + ',' + colorActual[2] + ')';
  //fondoCells[x + 1].style.color = 'rgb(0, 0, 255)';

  if (colorActual[0] < 211) {
    id[x] = setTimeout(noTieneFocus, 100, x);
  }
}

for (let i = 0; i < fondoCells.length; i += 2) {
  fondoCells[i].addEventListener("mouseover", () => {tieneFocus(i);}, false);
  fondoCells[i].addEventListener("mouseleave", () => {noTieneFocus(i);}, false);
}