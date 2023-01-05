import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D09SharedService } from './d09-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D09P02Service {
  numberArr: number[];

  constructor(
    private timerService: TimerService,
    private sharedService: D09SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    this.numberArr = this.sharedService.getParsedInput(rawInput);

    let invalidNumber: number;
    let invalidNumberIndex: number;

    for (let i = 25; i < this.numberArr.length; i++) {
      const prevNumbers = this.getPrevElements(i - 25);
      invalidNumber = this.numberArr[i];

      if (!this.isValid(invalidNumber, prevNumbers)) {
        invalidNumberIndex = i;
        break;
      }
    }

    let invalidSetStartNumber: number;
    let invalidSetEndNumber: number;

    for (let i = 0; i < invalidNumberIndex - 1; i++) {
      for (let j = i + 2; j < invalidNumberIndex + 1; j++) {
        const numbers = this.numberArr.slice(i, j);
        if (this.getSumOfArray(numbers) === invalidNumber) {
          invalidSetStartNumber = this.getMinValue(numbers);
          invalidSetEndNumber = this.getMaxValue(numbers);
          break;
        }
      }
    }

    const calculationTime = this.timerService.getTime();
    return {
      result:
        invalidSetStartNumber.toString() +
        ' + ' +
        invalidSetEndNumber.toString() +
        ' = ' +
        (invalidSetStartNumber + invalidSetEndNumber).toString(),
      calculationTime: calculationTime,
    };
  }

  getPrevElements(startIdx: number): number[] {
    return this.numberArr.slice(startIdx, startIdx + 25);
  }

  isValid(number: number, prevNumbers: number[]): boolean {
    for (let i = 0; i < prevNumbers.length - 1; i++) {
      const num1 = prevNumbers[i];
      for (let j = i + 1; j < prevNumbers.length; j++) {
        const num2 = prevNumbers[j];

        if (num1 + num2 === number && num1 !== num2) {
          return true;
        }
      }
    }

    return false;
  }

  getSumOfArray(numbers: number[]) {
    return numbers.reduce((a, b) => a + b, 0);
  }

  getMinValue(array: number[]) {
    return Math.min.apply(Math, array);
  }
  getMaxValue(array: number[]) {
    return Math.max.apply(Math, array);
  }
}
