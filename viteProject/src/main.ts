import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
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
  class StopWatch {
    private startTime: Date | null = null;
    private endTime: number | null = null;
    private duration: number = 0;
    private isRunning: boolean = false;

    start(): string {
      if (this.isRunning) {
        return `Already Running`;
      }
      this.startTime = new Date();
      this.isRunning = true;
      return `Started`;
    }

    stop(): string {
      if (!this.isRunning) {
        return `Not Running`;
      }
      this.endTime = new Date().getTime();
      this.duration += (this.endTime - (this.startTime?.getTime() || 0)) / 1000;
      this.startTime = null;
      this.isRunning = false;
      return `Stopped`;
    }

    reset(): void {
      this.startTime = null;
      this.endTime = null;
      this.duration = 0;
      this.isRunning = false;
    }

    getDuration(): number {
      if (this.isRunning) {
        this.endTime = new Date().getTime();
        let cur = (this.endTime - (this.startTime?.getTime() || 0)) / 1000;
        return this.duration+cur;
      }
      return this.duration;
    }
  }

  let stopwatch = new StopWatch();

  const startButton = document.querySelector<HTMLButtonElement>('#Start')!;
  startButton.addEventListener('click', () => {
    const status = stopwatch.start();
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
}
catch (e) {
  console.log(e)
}

