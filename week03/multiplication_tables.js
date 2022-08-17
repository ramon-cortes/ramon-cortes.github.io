//Creates a multiplier table similar to the exercise
//Added an extra "indentation" to accomodate 3 digits
//&nbsp; === one space in HTML

function createsMultTable() {
    for(let i = 1;  i <= 10; i++) {
        let tableText = '';
        for(let multiplier = 1; multiplier <= 10; multiplier++) {
            result = i * multiplier;
            if (result > 0 && result < 10) {
                tableText += '   ' + result;
            } else if (result >= 10 && result < 100) {
                tableText += '  ' + result;
            } else {
                tableText += ' ' + result;
            }
        }
        console.log(tableText);
        document.write(tableText.replaceAll(' ', '&nbsp;') + '<br>');
    }
}



