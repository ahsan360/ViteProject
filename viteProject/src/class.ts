export   class StopWatch {
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