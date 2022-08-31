const bostonPeople = boston.data;
const len = boston.data.length;

//Math.abs(parseInt(document.getElementById('circlesChosen').value));
document.getElementById('consola').innerHTML = 'Consola: ';

function everyOne() {
  let htmlTabla = `<table><tr><th>#</th><th>PERSON</th><th>TITLE</th><th>SALARY</th></tr>`
  for (let i = 0; i < len; i++) {
    let person = bostonPeople[i][8];
    let position = bostonPeople[i][9];
    let salary = bostonPeople[i][11];
  
    htmlTabla += `<tr>
    <td>${i + 1}</td>
    <td>${person}</td>
    <td>${position}</td>
    <td>${salary}</td>
    </tr>`;
  }
  htmlTabla += '</table>';
  document.getElementById('tabla').innerHTML = htmlTabla;
}

function overSome() {
  let htmlTabla = `<table><tr><th>#</th><th>PERSON</th><th>TITLE</th><th>SALARY</th></tr>`
  let over = Math.abs(parseInt(document.getElementById('over').value));
  if (over > 200000 || over < 50000) {
    over = 1000000;
  }

  let person = [];
  let position = [];
  let salary = [];
  for (let i = 0; i < len; i++) {    
    if (bostonPeople[i][11] >= over) {
      person.push(bostonPeople[i][8]);
      position.push(bostonPeople[i][9]);
      salary.push(bostonPeople[i][11]);
    }
  }
  for (let i = 0; i < salary.length; i++) {  
    htmlTabla += `<tr>
    <td>${i + 1}</td>
    <td>${person[i]}</td>
    <td>${position[i]}</td>
    <td>${salary[i]}</td>
    </tr>`;
  }
  htmlTabla += '</table>';
  document.getElementById('tabla').innerHTML = htmlTabla;
  document.getElementById('consola').innerHTML = 'Consola: ' + over;
}

function topSome() {
  let htmlTabla = `<table><tr><th>#</th><th>PERSON</th><th>TITLE</th><th>SALARY</th></tr>`
  let top = Math.abs(parseInt(document.getElementById('top').value));
  if (top < 1000 && top > 1) {
    let topOrganized = bostonPeople; //Unable to copy without reference to original array
    topOrganized.sort((a, b) => b[11] - a[11]);
    for (let i = 0; i < top; i++) {
      htmlTabla += `<tr>
      <td>${i + 1}</td>
      <td>${bostonPeople[i][8]}</td>
      <td>${bostonPeople[i][9]}</td>
      <td>${bostonPeople[i][11]}</td>
      </tr>`;
    }


  }
  //.sort((a, b) => a - b)

  document.getElementById('tabla').innerHTML = htmlTabla;
  document.getElementById('consola').innerHTML = 'Consola: ' + top;
}





/*let htmlTabla = `<table><tr><th>#</th><th>PERSON</th><th>TITLE</th><th>SALARY</th></tr>
<tr>
<td>${index}</td>
<td>${person}</td>
<td>${position}</td>
<td>${salary}</td>
</tr></table>`*/

/*
<table>
  <tr>
    <th>#</th>
    <th>PERSON</th>
    <th>SALARY</th>
  </tr>
  <tr>
    <td>1</td>
    <td>a</td>
    <td>2</td>
  </tr>      
</table>
*/