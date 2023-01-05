import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D02SharedService } from './d02-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D02P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D02SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const parsedInput = this.sharedService.getParsedInput(rawInput);

    let validNum = 0;

    parsedInput.forEach((element) => {
      let occuranceNum = 0;

      if (element.password[element.min - 1] === element.char) {
        occuranceNum++;
      }
      if (element.password[element.max - 1] === element.char) {
        occuranceNum++;
      }

      if (occuranceNum === 1) {
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
