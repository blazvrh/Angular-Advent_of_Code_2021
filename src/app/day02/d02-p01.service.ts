import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D02SharedService } from './d02-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D02P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D02SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const parsedInput = this.sharedService.getParsedInput(rawInput);

    let validNum = 0;

    parsedInput.forEach((element) => {
      const numOfChars = element.password.split(element.char).length - 1;

      if (numOfChars >= element.min && numOfChars <= element.max) {
        validNum++;
      }
    });

    const calculationTime = this.timerService.getTime();
    return {
      result: validNum.toString() + ' valid passwords!',
      calculationTime: calculationTime,
    };
  }
}
