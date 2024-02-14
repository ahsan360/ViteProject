import './style.css'
import { StopWatch } from './class.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="main">
  <h1>Stop Watch</h1>
  <div class="card">
    <button id="Start" type="button">Start</button>
    <p id="str"></p>
  </div>
  <div class="card">
    <button id="Stop" type="button">Stop</button>
    <p id="stop"></p>
  </div>
  <div class="card">
    <button id="Duration" type="button">Duration</button>
    <p id="duration"></p>
  </div>
  <div class="card">
  <button id="Reset" type="button">Reset</button>
  <p id="reset"></p>
</div>
</div>
`
try {

  let stopwatch = new StopWatch();

  const startButton = document.querySelector<HTMLButtonElement>('#Start')!;
  startButton.addEventListener('click', () => {
    const status: string = stopwatch.start();
    let statusElement = document.getElementById('str');
    if (statusElement)
      statusElement.textContent = status;
    setTimeout(() => {
      if (statusElement) statusElement.textContent = ''
    }, 2000)
  });
  const stopButton = document.querySelector<HTMLButtonElement>('#Stop')!;
  stopButton.addEventListener('click', () => {
    const status = stopwatch.stop();
    let statusElement = document.getElementById('stop');
    if (statusElement)
      statusElement.textContent = status;
    setTimeout(() => {
      if (statusElement) statusElement.textContent = ''
    }, 2000)
  });
  const durationButton = document.querySelector<HTMLButtonElement>('#Duration')!;
  durationButton.addEventListener('click', () => {
    const status: number = stopwatch.getDuration();
    let statusElement = document.getElementById('duration');
    if (statusElement)
      statusElement.textContent = String(status);
    setTimeout(() => {
      if (statusElement) statusElement.textContent = ''
    }, 2000)
  });
  const ResetButton = document.querySelector<HTMLButtonElement>('#Reset')!;
  ResetButton.addEventListener('click', () => {
    stopwatch.reset();
    let statusElement = document.getElementById('reset');
    if (statusElement)
      statusElement.textContent = 'Reseted';
    setTimeout(() => {
      if (statusElement) statusElement.textContent = ''
    }, 2000)
  });
  //----------------------TODO LIST-----------------------------------
  let stringArray2: Array<string> = [];
  const textInput = document.getElementById('textInput') as HTMLInputElement;
  const submitButton = document.getElementById('submitButton');
  const inputP = document.querySelector<HTMLParagraphElement>('.inputP');

  function updateOutput() {
      let outputText = '';
      for (let i: number = 0; i < stringArray2.length; i++) {
          outputText += `${i + 1} : ${stringArray2[i]} <button class="deleteButton" data-index="${i}">Delete</button><br> `;
      }
      inputP!.innerHTML = outputText;
      const deleteButtons = document.querySelectorAll('.deleteButton');
      deleteButtons.forEach(button => {
          button.addEventListener('click', (event) => {
              const indexToRemove = parseInt((event.currentTarget as HTMLButtonElement).getAttribute('data-index') || '0', 10);
              if (!isNaN(indexToRemove) && indexToRemove >= 0 && indexToRemove < stringArray2.length) {
                  stringArray2.splice(indexToRemove, 1);
                  updateOutput();
              }
          });
      });
  }

  if (submitButton) {
      submitButton.addEventListener('click', () => {
          const inputValue = textInput.value.trim();
          if (inputValue !== '') {
              stringArray2.push(inputValue);
              updateOutput();
              textInput.value = '';
          }
      });
  }

  updateOutput(); 
   
  
}
catch (e) {
  console.log(e)
}

