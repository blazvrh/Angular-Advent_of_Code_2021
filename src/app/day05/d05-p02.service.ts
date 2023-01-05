import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D05SharedService } from './d05-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D05P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D05SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const parsedInput = this.sharedService.getParsedInput(rawInput);

    let ids = [];
    parsedInput.forEach((element) => {
      ids.push(this.getId(element.xPosNum, element.yPosNum));
    });

    let foundFirstSeat = false;
    let result = '';

    for (let y = 0; y < 128; y++) {
      for (let x = 0; x < 8; x++) {
        const id = this.getId(x, y);

        if (!ids.includes(id) && foundFirstSeat) {
          result = id;

          break;
        } else if (ids.includes(id) && !foundFirstSeat) {
          foundFirstSeat = true;
        }
      }
      if (result !== '') {
        break;
      }
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: 'My seat ID is: ' + result,
      calculationTime: calculationTime,
    };
  }

  private getId(x: number, y: number) {
    return (y * 8 + x).toString();
  }
}
