import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D10SharedService } from './d10-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D10P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D10SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const numbers = this.sharedService
      .getParsedInput(rawInput)
      .sort((a, b) => a - b);

    numbers.splice(0, 0, 0); // add a leadin zero

    const differences = {
      0: 0,
      1: 0,
      2: 0,
      3: 1,
    };
    for (let i = 0; i < numbers.length - 1; i++) {
      const num1 = numbers[i];
      const num2 = numbers[i + 1];
      const difference = num2 - num1;
      differences[difference]++;
    }

    const calculationTime = this.timerService.getTime();
    const numberOfOneStep = differences[1];
    const numberOfThreeStep = differences[3];
    return {
      result:
        numberOfOneStep.toString() +
        ' * ' +
        numberOfThreeStep.toString() +
        ' = ' +
        (numberOfOneStep * numberOfThreeStep).toString(),
      calculationTime: calculationTime,
    };
  }
}
