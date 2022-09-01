const bostonPeople = boston.data;
const len = boston.data.length;

document.getElementById('consola').innerHTML = 'Consola: ';

//Creates HTML row info
function renderRows(data, rowAmount) {
  let htmlTabla = `<table><tr><th>#</th><th>PERSON</th><th>TITLE</th><th>SALARY</th></tr>`;

  for (let i = 0; i < rowAmount; i++) {
    htmlTabla += `<tr>
    <td>${i + 1}</td>
    <td>${data[i][8]}</td>
    <td>${data[i][9]}</td>
    <td>${data[i][11]}</td>
    </tr>`;
  }

  htmlTabla += '</table>';
  return htmlTabla;
}

function everyOne() {  
  document.getElementById('tabla').innerHTML = renderRows(bostonPeople, len);
}

function overSome() {  
  let over = Math.abs(parseInt(document.getElementById('over').value));

  if (over > 200000 || over < 50000) {
    over = 1000000;
  }

  //.filter is awesome. It works in a single line!
  let bostonFiltered = bostonPeople.filter((a) => a[11] >= over);    
  
  document.getElementById('tabla').innerHTML = renderRows(bostonFiltered, bostonFiltered.length);
  document.getElementById('consola').innerHTML = 'Consola: ' + over;
}

function topSome() {
  let top = Math.abs(parseInt(document.getElementById('top').value));
  
  if (top > 1 && top <= 1000) {
    //Clones array to leave original unmodified
    let topOrganized = JSON.parse(JSON.stringify(bostonPeople));
    //Descending sort
    topOrganized.sort((a, b) => b[11] - a[11]);
    document.getElementById('tabla').innerHTML = renderRows(topOrganized, top);
  }

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