let result = document.getElementById('result');

function tablify(arr) {
  let html = '<table><tr><th>WORD</th><th>COUNT</th></tr>';
  
  for (let i = 0; i < arr.length; i++) {
    html += `<tr><td>${arr[i][0]}</td><td>${arr[i][1]}</td></tr>`
  }  

  html += '</table>'
  return html;
}

function countWords() {
  text = document.getElementById('input').value;
  text = text.toLowerCase();
  text = text.replaceAll('.', '');
  text = text.replaceAll(',', '');
  const wordArray = text.split(" ");
  
  //Crea el objeto
  const wordCount = {};
  wordArray.forEach((item) => {
    //Si no existe el key en el objeto, lo crea e inicializa en 1
    //                                   ↓
    if (wordCount[item] == null) {//     ↓
      wordCount[item] = 1;  //←-----------
    }      
    else {
      wordCount[item]++;
    }
  });

  
  wordCountArr = Object.entries(wordCount); //Convierte objeto a arreglo
  wordCountArr.sort((a, b) => b[1] - a[1]); //Ordena descendente
  
  //let wordCountTop = wordCountArr.slice(0, 3); //Si sólo quieres top 3
  console.log(JSON.stringify(wordCountArr));
  console.log(wordCountArr.length);

  result.innerHTML = tablify(wordCountArr);
}



/*
<table><tr><th>WORD</th><th>COUNT</th></tr>
<tr><td>${}</td><td>${}</td></tr>
</table>
*/