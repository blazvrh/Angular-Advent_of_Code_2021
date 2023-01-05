import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D15SharedService } from './d15-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D15P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D15SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const numbers = this.sharedService.getParsedInput(rawInput);

    let lastNumber = 7;

    for (let i = Object.keys(numbers).length + 1; i < 30_000_001; i++) {
      let nextNumber: number;

      if (numbers[lastNumber].prevPosition == null) {
        nextNumber = 0;

      } else {
        nextNumber =
          numbers[lastNumber].lastPostion - numbers[lastNumber].prevPosition;
      }

      if (numbers[nextNumber] == null) {
        numbers[nextNumber] = {
          lastPostion: i,
        };
      } else {
        numbers[nextNumber].prevPosition = numbers[nextNumber].lastPostion;
        numbers[nextNumber].lastPostion = i;
      }

      lastNumber = nextNumber;
    }

    let result;
    for (let key of Object.keys(numbers)) {
      if ((numbers[key].lastPostion == 30_000_000)) {
        result = key;
        break;
      }
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }
}
