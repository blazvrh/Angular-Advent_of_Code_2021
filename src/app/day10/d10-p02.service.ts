import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D10SharedService } from './d10-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D10P02Service {
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

    const numberValues = { 0: 1 };
    for (let i = 1; i < numbers.length; i++) {
      const currentNumber = numbers[i];

      let value = 0;

      for (let j = i - 1; j >= 0; j--) {
        const previousNumber = numbers[j];
        if (previousNumber < currentNumber - 3) {
          break;
        }
        value += numberValues[previousNumber];
      }
      numberValues[currentNumber] = value;
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: (numberValues[numbers[numbers.length - 1]]).toString(),
      calculationTime: calculationTime,
    };
  }
}
