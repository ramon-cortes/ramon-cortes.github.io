import { sk, port } from './portfolio.js';

let secondLine = 'top';
let intervalId = 0; 

// ---Cambia el color de los links del menú---
// ---Dependiendo de si la página está hasta arriba---
let menuLinks = document.querySelectorAll('.wrapper-menu a');
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

//Animación DIVS portfolio subsecuentes (conforme usuario hace "scroll")
function changeOpaScale(vh, scrolledPixels) {
  let ajustes = [0.2 * vh, 0.5 * vh, 1.1 * vh];
  //console.log(ajustes);
  for (let r = 3; r < (3 + ajustes.length); r++) {
    let renglonDivs = document.getElementsByClassName(`renglon-${r}`);
    //console.log(renglonDivs);
    if (renglonDivs[0]) {
      if (scrolledPixels > ajustes[r - 3]) {
        renglonDivs[0].style.opacity = '1';
        renglonDivs[1].style.opacity = '1';
        renglonDivs[0].style.scale = '1';
        renglonDivs[1].style.scale = '1';
      } else {
        renglonDivs[0].style.opacity = '0';
        renglonDivs[1].style.opacity = '0';
        renglonDivs[0].style.scale = '0.1';
        renglonDivs[1].style.scale = '0.1';
      }
    }    
  }  
}
// Fin Animación DIVS portfolio subsecuentes

// ---Ejecuta cuando se hace "scroll"---
function scrolling(e) {
          // Consola >
  //let consola = document.getElementById('consola');
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
  changeOpaScale(vh, scrolledPixels);
    
  // Consola >
  /*consola.innerHTML = `>${scrolledPixels} 
  <br>
  ${secondLine} ${url}`;*/
}
// --- Fin animación div al entrar en viewport ---


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

// --- Animación skills ---
function animacionSkills() {
  // PASOS:
  // Crear div y ponerle un "skill" al azar  
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let body = document.getElementsByTagName('body')[0];
  let rand = Math.round(Math.random() * (sk.length - 1));
  let skillsDiv = document.createElement('div');
  skillsDiv.innerText = sk[rand].text;
  skillsDiv.className = 'skills-div';
  // Colocar div en posición al azar
  let x = Math.round(Math.random() * (0.2 * vw) + (0.04 * vw));
  let y = Math.round(Math.random() * (0.15 * vh) + (0.33 * vh));  
  //                              area ↑     offset ↑
  skillsDiv.style.left = `${x}px`;
  skillsDiv.style.top = `${y}px`;
  body.appendChild(skillsDiv);  
  // Mover div en dirección al azar
  let radian = Math.random() * 2 * Math.PI; //Ángulo
  let h = 3; //Distancia
  let incX = Math.round(h * Math.cos(radian));
  let incY = Math.round(h * Math.sin(radian));
  //console.log(`(${incX}, ${incY})`);
  let intervalIdA = setInterval(() => {
    x = Number(skillsDiv.style.left.replace('px', ''));
    y = Number(skillsDiv.style.top.replace('px', ''));
    skillsDiv.style.left = `${x + incX}px`;
    skillsDiv.style.top = `${y + incY}px`;
  }, 50);
  
  // Quitar div
  setTimeout(() => {
    clearInterval(intervalIdA);
    body.removeChild(skillsDiv);
  }, 2500);
  // ↑ tiene que ser menor que el interval de "animacionSkills"
}
// --- Fin Animación skills ---

// ----- Router -----
const contenido = document.getElementById('contenido');

async function router() {
  let url = window.location.hash;
  if (!url) url = '#/home'; //para la primera vez
  url = url.split('/')[1] + '.html';
  const response = await fetch(url);
  const innerHtml = await response.text();  
  contenido.innerHTML = innerHtml;

  
  // Resetear interval de la "animación skills"
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = 0;
  }    

  // --- Efecto wobble para página de inicio ---  
  if (url.split('.')[0] === 'home') {
    let skills = document.getElementById('skills');
    let sysadmin = document.getElementById('sysadmin');
    // --- Animación skills ---
    intervalId = setInterval(() => animacionSkills(), 4000);
    // --- Fin Animación skills ---
    setTimeout(() => {
      skills.style.marginLeft = '3vw';
      skills.style.animation = 'wobble 4s linear infinite';
    }, 4000);    
    setTimeout(() => {
      sysadmin.style.marginLeft = '-60vw';
      sysadmin.style.animation = 'wobble 4s linear infinite';
    }, 5250);   
  }
  // --- Fin efecto wobble ---

  // --- Mostrar / expandir elemento del Portfolio ---
  let portfolioItems = [];
  for (let i = 0; i < port.length; i++) portfolioItems.push(document.getElementById(`p-item-${i}`));
  //console.log(portfolioItems);
  if (portfolioItems[0]) {
    for (let i = 0; i < port.length; i++) {
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

