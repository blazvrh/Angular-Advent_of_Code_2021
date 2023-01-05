import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D23SharedService } from './d23-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D23P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D23SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const cups = this.sharedService.getParsedInputPart2(rawInput);

    for (let i = 0; i < 10_000_000; i++) {
      cups.mixCups();
    }

    const result = cups.getResult();

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }
}
