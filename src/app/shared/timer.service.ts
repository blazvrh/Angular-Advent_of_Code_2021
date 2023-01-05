import { Injectable } from '@angular/core';

class Timer {
  startTime: Date;
  endTime: Date;

  start() {
    this.startTime = new Date();
  }

  stop() {
    this.endTime = new Date();
  }

  getPassedTime() {
    this.endTime.getTime() - this.startTime.getTime();
  }
}

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private startTime: Date;

  constructor() {}

  startTimer(): void {
    this.startTime = new Date();
  }

  getTime(): number {
    const passedSeconds = (new Date().getTime() - this.startTime.getTime());
    console.log("Timer: " + passedSeconds + " miliseconds")
    return passedSeconds
  }
}
