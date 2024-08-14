document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const rowInput = document.querySelectorAll('#formss input.text')[0];
    const delayInput = document.querySelectorAll('#formss input.text')[1];
    const pyramidContainer = document.querySelector('.pyramid-container');
    let timeoutId;
    let numRows;
    let delay;

    // Update the row number and delay when pressing Enter
    rowInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            numRows = parseInt(rowInput.value) || 0;
            // numRows = numRows % 2 === 0 ? numRows + 1: numRows;  //Ensure numRows is odd
            // rowInput.value = numRows //update the input fiels with the odd number
            createPyramid(numRows);
        }
    });

    delayInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            delay = parseInt(delayInput.value) || 0;
            console.log('Delay set to:', delay)
        }
    });

    startButton.addEventListener('click', function() {
        console.log('start button clicked')
        if (numRows > 0 && delay > 0) {
            clearTimeout(timeoutId);
            resetPyramid();
            lightUpPyramid();
        } 
        else {
            alert('Please enter valid number of rows and delay.');
        }
    });

    stopButton.addEventListener('click', function() {
        console.log('stop button clicked')
        clearTimeout(timeoutId);
        // Optionally, you can also turn off all LEDs
        
        // const leds = document.querySelectorAll('.led');
        // leds.forEach(led => led.classList.remove('active'));
    });

    function createPyramid(rows) {
        pyramidContainer.innerHTML = ''; // Clear previous pyramid
        // rowIndex = 0;
        for (let i = 0; i < rows; i ++) {
            const row = document.createElement('div');
            row.classList.add('pyramid-row');

            // ensure each row has an odd number of leds
            const numLeds = 2 * i + 1;
            for (let j = 0; j < numLeds; j++) {
                const led = document.createElement('div');
                led.classList.add('led');
                row.appendChild(led);
            }

            pyramidContainer.appendChild(row);
        }      
    }
      
function resetPyramid(){
        const leds = document.querySelectorAll('.led');
        leds.forEach(led => led.classList.remove('active'));
    }
    
function lightUpPyramid(){
    let currentRow = 0;

    function lightRow(){

        if(currentRow > 0){
            // turn off the previous row
            const previousRow = pyramidContainer.children[currentRow - 1];
            const previousLeds = previousRow.children;
            Array.from(previousLeds).forEach(led => led.classList.remove('active'));
        }

        if(currentRow < numRows){
            const row = pyramidContainer.children[currentRow];
            const leds = row.children;

            Array.from(leds).forEach(led => led.classList.add('active'));
            console.log(`lighting up row ${currentRow + 1}`);

            currentRow++;

            timeoutId = setTimeout(lightRow,delay)
        } else{
            // restart the sequence

            currentRow = 0;
            timeoutId = setTimeout(lightRow, delay);  //start from the 1st row
        }
    }

    lightRow();   //start the lighting sequence

    }
});

