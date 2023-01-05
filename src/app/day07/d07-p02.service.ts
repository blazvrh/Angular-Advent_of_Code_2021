import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D07SharedService } from './d07-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D07P02Service {
  private allBags;

  constructor(
    private timerService: TimerService,
    private sharedService: D07SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    this.allBags = this.sharedService.getParsedInput(rawInput);

    const result = this.getNumberOfBags('shiny gold');

    const calculationTime = this.timerService.getTime();
    return {
      result: 'Number of needed bags: ' + result.toString(),
      calculationTime: calculationTime,
    };
  }

  private getNumberOfBags(bagColor: string) {
    if (this.allBags[bagColor] == null) {
      return 0;
    } else {
      const bagKeys = Object.keys(this.allBags[bagColor]);
      let bagNum = 0;
      for (let i = 0; i < bagKeys.length; i++) {
        bagNum +=
          this.allBags[bagColor][bagKeys[i]] +
          this.allBags[bagColor][bagKeys[i]] * this.getNumberOfBags(bagKeys[i]);
      }
      return bagNum;
    }
  }
}
