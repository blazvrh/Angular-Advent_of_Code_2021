import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';

import { D01SharedService } from './d01-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D01P02Service {
  constructor(
    private sharedService: D01SharedService,
    private timerService: TimerService
  ) {}

  getResult(
    rawInput: string
  ): { result: string; nums: string[]; calculationTime: number } {
    this.timerService.startTimer();

    const numbers = this.sharedService.getParsedInput(rawInput);

    for (let i = 0; i < numbers.length - 2; i++) {
      for (let j = i + 1; j < numbers.length - 1; j++) {
        for (let k = j + 1; k < numbers.length; k++) {
          if (
            i !== j &&
            i !== k &&
            numbers[i] + numbers[j] + numbers[k] === 2020
          ) {
            const calculationTime = this.timerService.getTime();
            return {
              nums: [
                numbers[i].toString(),
                numbers[j].toString(),
                numbers[k].toString(),
              ],
              result: (numbers[i] * numbers[j] * numbers[k]).toString(),
              calculationTime: calculationTime,
            };
          }
        }
      }
    }

    const calculationTime = this.timerService.getTime();
    return { result: 'Not found!', nums: [], calculationTime: calculationTime };
  }
}
