import { Injectable } from '@angular/core';

import { TimerService } from '../shared/timer.service';
import { D03SharedService } from './d03-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D03P02Service {
  steps: { right: number; down: number }[] = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  private position: { x: number; y: number } = {
    x: 0,
    y: 0,
  };

  private limitations: { xMax: number; yMax: number };
  private treeCounter = 0;
  private input;

  private encounteredTreesList: number[] = [];

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

    this.steps.forEach((element) => {
      while (this.position.y < this.limitations.yMax - 1) {
        this.move(element.right, element.down);
        this.checkPosition();
      }

      this.encounteredTreesList.push(this.treeCounter);
      this.treeCounter = 0;
      this.position = {
        x: 0,
        y: 0,
      };
    });

    const calculationTime = this.timerService.getTime();
    return {
      result: 'Result: ' + this.encounteredTreesList.reduce((a, b) => a * b),
      calculationTime: calculationTime,
    };
  }

  private move(xStep: number, yStep: number) {
    this.position.x = (this.position.x + xStep) % this.limitations.xMax;
    this.position.y += yStep;
  }

  private checkPosition() {
    if (this.input[this.position.x][this.position.y].isTree) {
      this.treeCounter++;
    }
  }
}
