const bostonPeople = boston.data;
const len = boston.data.length;

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

function overOneK() {
  let htmlTabla = `<table><tr><th>#</th><th>PERSON</th><th>TITLE</th><th>SALARY</th></tr>`
  let person = [];
  let position = [];
  let salary = [];
  for (let i = 0; i < len; i++) {    
    if (bostonPeople[i][11] >= 100000) {
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