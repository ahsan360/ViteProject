import './style.css'
import { StopWatch } from './class.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="main">
  <h1>Stop Watch</h1>
  <h2 id="str"></h2>
  <div class="card">
    <button class="idx" type="button">Start</button>
  </div>
  <div class="card">
    <button class="idx" type="button">Stop</button>
  </div>
  <div class="card">
    <button class="idx" type="button">Duration</button>
  </div>
  <div class="card">
  <button class="idx" type="button">Reset</button>
</div>
</div>
`
try {
  let timeout = (status: string) => {
    let statusElement = document.getElementById('str');
    if (statusElement)
      statusElement.textContent = status;
    setTimeout(() => {
      if (statusElement) statusElement.textContent = ''
    }, 2000)
  }
  let stopwatch = new StopWatch();
  const startButton = document.querySelectorAll<HTMLButtonElement>('.idx')!;
  for (let i of startButton) {
    let btn = i
    btn.addEventListener('click', function (this: HTMLButtonElement, event: MouseEvent) {
      let status : string;
      if (btn.innerHTML == 'Start') {
           status = stopwatch.start();
           timeout(status)
      }
      else if(btn.innerHTML == 'Stop'){
          status  = stopwatch.stop();
          timeout(status)
      }
      else if(btn.innerHTML == 'Duration'){
        status = String(stopwatch.getDuration());
        timeout(status)
      }
      else {
        stopwatch.reset();
        timeout(status="Reseted")
      }
    });
  }
  //----------------------TODO LIST-----------------------------------
  const submitButton = document.getElementById('submitButton');
  function addItem(text: string) {
    const inputP = document.querySelector<HTMLParagraphElement>('.inputP');
    let child = document.createElement('p');
    child.innerHTML = `${text} <button class='btn'>delete</button>`
    inputP?.appendChild(child)
    child.querySelectorAll('.btn')[0]?.addEventListener('click', (event) => {
      let cur = <HTMLButtonElement>event.target;
      let t = <HTMLDivElement>cur.parentElement
      if (t) t.remove()
    })
  }
  if (submitButton) {
    submitButton.addEventListener('click', (event: MouseEvent) => {
      const textInput: HTMLInputElement = document.getElementById('textInput') as HTMLInputElement;
      addItem(textInput.value)
    });
  }

}
catch (e) {
  console.log(e)
}
