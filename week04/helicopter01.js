let img = document.getElementById('helicopter');
img.style.left = '262px';
img.style.top = '410px';
const imgHelis = [
  './helicopter01.gif',
  './helicopter02.gif',
  './helicopter03.gif',
  './helicopter04.gif'
]
let imgHelisIndex = 0;
let iniciar = false;
let x = y = 0;
let intervalId;

// function girarAspas(derecha) {
//   if (derecha) {

//   }
//   if ((imgHelisIndex === 0 || imgHelisIndex === 2) && derecha) {
//     imgHelisIndex = 3;
//     img.src = imgHelis[imgHelisIndex];
//   } else {
//     imgHelisIndex = 2;
//     img.src = imgHelis[imgHelisIndex];
//   } 
// }

function mueveHeli(actual, destino, inferior, superior) {
  destino -= 50; //Centrar en la imagen
  if (destino > inferior && destino < superior) {
    if (actual < destino) {
      //Incrementa posición (derecha/abajo)
      actual++;
    } else if (actual > destino) {
      //Decrementa posición (izquierda/arriba)
      actual--; 
    } 
    //img.src = imgHelis[imgHelisIndex];
    return actual + 'px';
  }
}

function ciclo(x, y) {  
  if (iniciar) {
    //Posición actual
    actualX = parseInt(img.style.left);
    actualY = parseInt(img.style.top);

    //Últimos 2 params son límite inferior y superior
    img.style.left = mueveHeli(actualX, x, 9, 557, true);
    //img.src = imgHelis[imgHelisIndex];
    img.style.top = mueveHeli(actualY, y, 27, 410, false);
    
    //Decidir si giran las aspas
    if (actualX < x - 50) {
      if (imgHelisIndex === 0 || imgHelisIndex === 2) {
        imgHelisIndex = 3;
      } else {
        imgHelisIndex = 2;
      }
    } else if (actualX > x - 50){
      if (imgHelisIndex === 1 || imgHelisIndex === 3) {
        imgHelisIndex = 0;
      } else {
        imgHelisIndex = 1;
      }
    } else {
      switch (imgHelisIndex) {
        case 0:
          imgHelisIndex = 1;
          break;
        case 1:
            imgHelisIndex = 0;
            break;
        case 2:
          imgHelisIndex = 3;
          break;
        case 3:
          imgHelisIndex = 2;
          break;
      }
    }
    
    img.src = imgHelis[imgHelisIndex];

    document.getElementById('consola2').innerHTML = 'Current pos (' + actualX + ', ' + actualY + ')';    
  }  

}

intervalId = setInterval(ciclo, 50, x, y);

function inicia(raton) {
  clearInterval(intervalId);
  iniciar = true;
  
  //?? Parece que al usar el addEventListener inicializa ese método "clientX" y "clientY"
  x = raton.clientX; 
  y = raton.clientY; 
  
  intervalId = setInterval(ciclo, 50, x, y);
  document.getElementById('consola').innerHTML = 'Go to ('+ (x - 50) + ', ' + (y - 50) + ')';  
}

window.addEventListener("mousedown", inicia, false);