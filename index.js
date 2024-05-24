import { port } from './portfolio.js';

let secondLine = 'top';

// ---Cambia el color de los links del menú---
// ---Dependiendo de si la página está hasta arriba---
let menuLinks = document.querySelectorAll('.wrapper-menu a');
console.log(menuLinks.length);
function toggleColorOn(e, i) {  
  if (secondLine === 'top') {
    menuLinks[i].style.color = 'rgb(156, 220, 254)';
  } else {
    menuLinks[i].style.color = 'rgb(75, 105, 255)';
  }      
}
function toggleColorOff(e, i) {  
  if (secondLine === 'top') {
    menuLinks[i].style.color = 'white';
  } else {
    menuLinks[i].style.color = 'black';
  }  
}
for (let i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener('mouseenter', (e) => toggleColorOn(e, i));
  menuLinks[i].addEventListener('mouseleave', (e) => toggleColorOff(e, i));
}

// ---Ejecuta cuando se hace "scroll"---
function scrolling(e) {
  let consola = document.getElementById('consola');
  let scrolledPixels = window.scrollY;
  let url = window.location.hash.split('/')[1];
  let vh = window.innerHeight;
  let menus = [];

  // "semi"-ocultar el menú
  // obtener menus y guardarlos en arreglo
  for (let i = 0; i < 3; i++) {
    menus.push(document.getElementById(`menu${i}`));    
  }
  
  if (!scrolledPixels && menus[0].style.backgroundColor != 'var(--colorcombo-high)') {
    secondLine = 'top';
    for (let i = 0; i < 3; i++) {
      menus[i].style.backgroundColor = 'var(--colorcombo-high)';
      menus[i].style.paddingTop = '10px';
    }
    for (let i = 0; i < menuLinks.length; i++) {
      menuLinks[i].style.color = 'white';
    }
  } else if (scrolledPixels && menus[0].style.backgroundColor != 'rgba(0, 0, 0, 0)') {
    secondLine = '';
    for (let i = 0; i < 3; i++) {
      menus[i].style.backgroundColor = 'rgba(0,0,0,0)';
      menus[i].style.paddingTop = '2px';
    } 
    for (let i = 0; i < menuLinks.length; i++) {
      menuLinks[i].style.color = 'black';
    }
  }

  // Tratando de animar un div al estar en el viewport
  let renglon3 = document.getElementsByClassName('renglon-3');
  if (renglon3[0]) {
    if (scrolledPixels > (0.2 * vh)) {
      renglon3[0].style.opacity = '1';
      renglon3[1].style.opacity = '1';
      renglon3[0].style.scale = '1';
      renglon3[1].style.scale = '1';
    } else {
      renglon3[0].style.opacity = '0';
      renglon3[1].style.opacity = '0';
      renglon3[0].style.scale = '0.1';
      renglon3[1].style.scale = '0.1';
    }
  }  
  let renglon4 = document.getElementsByClassName('renglon-4');
  if (renglon4[0]) {
    if (scrolledPixels > (0.5 * vh)) {
      renglon4[0].style.opacity = '1';
      renglon4[1].style.opacity = '1';
      renglon4[0].style.scale = '1';
      renglon4[1].style.scale = '1';
    } else {
      renglon4[0].style.opacity = '0';
      renglon4[1].style.opacity = '0';
      renglon4[0].style.scale = '0.1';
      renglon4[1].style.scale = '0.1';
    }
  }  
    
  consola.innerHTML = `>${scrolledPixels} 
  <br>
  ${secondLine} ${url}`;
}


// --- Crear div con detalles portfolio ---
function eliminaEste(body, divDescripcion) {  
  if (divDescripcion) {
    //Antes de cerrar el div, añadir transición para que parezca que desaparece;
    divDescripcion.style.transition = 'opacity 0.5s, scale 0.5s';
    divDescripcion.style.opacity = '0';
    divDescripcion.style.scale = '0';
    //Cuando termine la transición, quitar el div
    setTimeout(() => {      
      body.removeChild(divDescripcion);
    }, 500);    
  }
}

// Genera el div con los detalles del elemento portfolio seleccionado
function detallesPorfolio(e, j) {
  let body = document.getElementsByTagName('body')[0];

  let divAnterior = document.getElementById('portfolio-detalle');
  if (divAnterior) {
    // si ya existía un div detallado de portfolio, lo elimina primero
    eliminaEste(body, divAnterior);
  } else {
    let divDescripcion = document.createElement('div');
    divDescripcion.id = 'portfolio-detalle';
    divDescripcion.className = 'portfolio-detalle';
    let imgOrVideo = '';
    if (port[j].isImg) {
      imgOrVideo = `<img class='portfolio-img-content' src="${port[j].img}" alt="">`;
    } else {
      imgOrVideo = `<iframe class='portfolio-img-content-vid' src="${port[j].img}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>`
    }
    
    divDescripcion.innerHTML = `
    <div class='close-titulo portfolio-titulo'>
      <div class=''>
        ${port[j].title}
      </div>
      <div id='close-this' class='close-button'>
        &nbsp;X
      </div>    
    </div>
    <div class='portfolio-ruler'>
    </div>
    <div class='portfolio-descr'>
      ${port[j].description} <br>
      <a href="${port[j].link}" target="_blank">URL</a> &nbsp;
      <a href="${port[j].repo}" target="_blank">Repo</a> &nbsp;
      *(links open in a new window)
    </div>
    <div class='portfolio-img'>
      ${imgOrVideo}
    </div>
    `;    
    
    body.appendChild(divDescripcion);
  
    // Evento para que elimine el div al hacer click en 'X'
    let closeThis = document.getElementById('close-this');
    closeThis.addEventListener('click', (e) => eliminaEste(body, divDescripcion));
  }  
}
// --- Fin Crear div con detalles portfolio ---

// ----- Router -----
const contenido = document.getElementById('contenido');

async function router() {
  let url = window.location.hash;
  if (!url) url = '#/home'; //para la primera vez
  url = url.split('/')[1] + '.html';
  const response = await fetch(url);
  const innerHtml = await response.text();  
  contenido.innerHTML = innerHtml;

  // --- Efecto wobble para página de inicio ---  
  if (url.split('.')[0] === 'home') {
    let skills = document.getElementById('skills');
    let sysadmin = document.getElementById('sysadmin');
    setTimeout(() => {
      skills.style.marginLeft = '3vw';
      skills.style.animation = 'wobble 3s linear infinite';
    }, 4000);    
    setTimeout(() => {
      sysadmin.style.marginLeft = '-60vw';
      sysadmin.style.animation = 'wobble 3s linear infinite';
    }, 5250);   
  }
  // --- Fin efecto wobble ---

  // --- Mostrar / expandir elemento del Portfolio ---
  let portfolioItems = [];
  for (let i = 0; i < 8; i++) portfolioItems.push(document.getElementById(`p-item-${i}`));
  //console.log(portfolioItems);
  if (portfolioItems[0]) {
    for (let i = 0; i < 8; i++) {
      portfolioItems[i].addEventListener('click', (e) => detallesPorfolio(e, i));
    }    
  }
  // --- Fin Mostrar / expandir elemento del Portfolio ---

  // --- Eliminar posible div abierto ---
  eliminaEste(document.getElementsByTagName('body')[0], document.getElementById('portfolio-detalle')); 
    
}
router();

window.addEventListener('hashchange', router);
// ----- Router fin -----

document.addEventListener('scroll', (e) => scrolling(e));

