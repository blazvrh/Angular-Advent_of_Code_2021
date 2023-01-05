import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D25SharedService } from './d25-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D25P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D25SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const input = this.sharedService.getParsedInput(rawInput);

    const cardLoopSize = this.getLoopSize(input.cardPublicKey);
    const doorLoopSize = this.getLoopSize(input.doorPublicKey);

    let result = 1;
    for (let i = 0; i < cardLoopSize; i++) {
      result = this.getTransformedValue(result, input.doorPublicKey);
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }

  getLoopSize(publicKey: number): number {
    let value = 1;

    for (let i = 1; i < 150_000_000; i++) {
      value = this.getTransformedValue(value, 7);

      if (value === publicKey) {
        return i;
      }
    }

    return -1;
  }

  getTransformedValue(value: number, subjectNumber: number): number {
    let newVal = value * subjectNumber;
    return newVal % 20201227;
  }
}
