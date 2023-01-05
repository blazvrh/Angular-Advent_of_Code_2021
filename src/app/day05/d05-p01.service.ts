import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D05SharedService } from './d05-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D05P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D05SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const parsedInput = this.sharedService.getParsedInput(rawInput);
    let maxId = 0;

    parsedInput.forEach((element) => {
      const id = element.yPosNum * 8 + element.xPosNum;

      if (id > maxId) {
        maxId = id;
      }
    });
    const calculationTime = this.timerService.getTime();
    return {
      result: 'Highest seat ID is: ' + maxId.toString(),
      calculationTime: calculationTime,
    };
  }
}
