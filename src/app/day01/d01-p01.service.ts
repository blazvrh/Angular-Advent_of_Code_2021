import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';

import { D01SharedService } from './d01-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D01P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D01SharedService
  ) {}

  getResult(
    rawInput: string
  ): { result: string; nums: string[]; calculationTime: number } {
    this.timerService.startTimer();

    const numbers = this.sharedService.getParsedInput(rawInput);

    for (let i = 0; i < numbers.length - 1; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (i !== j && numbers[i] + numbers[j] === 2020) {
          const calculationTime = this.timerService.getTime();
          return {
            nums: [numbers[i].toString(), numbers[j].toString()],
            result: (numbers[i] * numbers[j]).toString(),
            calculationTime: calculationTime,
          };
        }
      }
    }

    const calculationTime = this.timerService.getTime();
    return { result: 'Not found!', nums: [], calculationTime: calculationTime };
  }
}
