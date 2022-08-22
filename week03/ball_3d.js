//Crea el Projectil1
let projectil1 = document.createElement("div");
projectil1.style.position = 'absolute';
projectil1.style.zIndex = '1';
projectil1.style.left = '10px';
projectil1.style.top = '10px';
projectil1.style.width = '25px';
projectil1.style.height = '25px';
projectil1.style.backgroundColor = 'rgb(200,200,0)';
projectil1.style.borderRadius = '50%';
document.body.appendChild(projectil1);
//Crea el Sombra
let sombra1 = document.createElement("div");
sombra1.style.position = 'absolute';
sombra1.style.left = '10px';
sombra1.style.top = '10px';
sombra1.style.width = '25px';
sombra1.style.height = '25px';
sombra1.style.backgroundColor = 'rgb(225,225,225)';
sombra1.style.borderRadius = '50%';
document.body.appendChild(sombra1);

//Definir el area (SVGA 800 * 600)
let valoresX = [25, 0, 400, true, 4]; //[posición, limiteInf, limiteSup, dirección, velocidad]
let valoresY = [50, 0, 250, true, 7]; //[posición, limiteInf, limiteSup, dirección]
let valoresZ = [25, 25, 50, true, 1]; //[posición, limiteInf, limiteSup, dirección]

//let posX = parseInt(projectil1.style.left.replace('px', ''));

function moverProj(datosProjectil, vel) {
    if (datosProjectil[3]) {
        if (datosProjectil[0] > datosProjectil[2]) {
            datosProjectil[3] = false;
            datosProjectil[0] -= datosProjectil[4];
        } else {
            datosProjectil[0] += datosProjectil[4];
        }
    } else {
        if (datosProjectil[0] > datosProjectil[1]) {
            datosProjectil[0] -= datosProjectil[4];
        } else {
            datosProjectil[3] = true;
            datosProjectil[0] += datosProjectil[4];
        }
    }
    //console.log(posX);
}


//----------------------------------------------------------
function iniciar() {    
    moverProj(valoresX);
    projectil1.style.left = valoresX[0] + 'px';
    moverProj(valoresY);
    projectil1.style.top = valoresY[0] + 'px';
    moverProj(valoresZ);
    projectil1.style.height = projectil1.style.width = valoresZ[0] + 'px';
    //Sombra
    let posSombra = valoresX[0] + ((valoresZ[0] - 25) * 2);
    sombra1.style.left = posSombra + 'px';
    posSombra = valoresY[0] + ((valoresZ[0] - 25) * 2);
    sombra1.style.top = posSombra + 'px';
    let tamanoSombra = Math.round(valoresZ[0] * 3 - 50);
    sombra1.style.height = sombra1.style.width = tamanoSombra + 'px';
    document.getElementById('consola').innerHTML = 'CONSOLE: '+ tamanoSombra;
}
setInterval(iniciar, 50);