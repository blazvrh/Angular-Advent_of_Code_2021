import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D03SharedService } from './d03-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D03P01Service {
  private position: { x: number; y: number } = {
    x: 0,
    y: 0,
  };

  private limitations: { xMax: number; yMax: number };
  private treeCounter = 0;
  private input;

  constructor(
    private timerService: TimerService,
    private sharedService: D03SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const parsedInput = this.sharedService.getParsedInput(rawInput);
    this.input = parsedInput.input;
    this.limitations = {
      xMax: parsedInput.xMax,
      yMax: parsedInput.yMax,
    };

    while (this.position.y < this.limitations.yMax - 1) {
      this.move();
      this.checkPosition();
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: this.treeCounter.toString() + ' trees encountered!',
      calculationTime: calculationTime,
    };
  }

  private move() {
    this.position.x = (this.position.x + 3) % this.limitations.xMax;
    this.position.y += 1;
  }

  private checkPosition() {
    if (this.input[this.position.x][this.position.y].isTree) {
      this.treeCounter++;
    }
  }
}
