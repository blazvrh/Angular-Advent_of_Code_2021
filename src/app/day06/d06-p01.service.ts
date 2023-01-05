import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D06SharedService } from './d06-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D06P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D06SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const parsedInput = this.sharedService.getParsedInput(rawInput);

    let result = 0;
    parsedInput.forEach((element) => {
      result += Object.keys(element).length;
    });

    const calculationTime = this.timerService.getTime();
    return {
      result: "Sum of correct answers: " + result.toString(),
      calculationTime: calculationTime,
    };
  }
}
