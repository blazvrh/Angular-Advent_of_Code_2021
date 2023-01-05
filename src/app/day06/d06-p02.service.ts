import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D06SharedService } from './d06-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D06P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D06SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const parsedInput = this.sharedService.getParsedInput(rawInput);

    let result = 0;
    parsedInput.forEach((element) => {
      const numOfPeople = element.numOfPeople;

      let numOfCorrectAnswers = 0;

      Object.keys(element).forEach((key) => {
        if (key !== "numOfPeople" && element[key] == numOfPeople) {
          numOfCorrectAnswers++;
        }
      });

      result += numOfCorrectAnswers;
    });

    const calculationTime = this.timerService.getTime();
    return {
      result: 'Sum of correct answers: ' + result.toString(),
      calculationTime: calculationTime,
    };
  }
}
