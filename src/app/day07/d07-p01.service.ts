import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D07SharedService } from './d07-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D07P01Service {
  private allBags;

  constructor(
    private timerService: TimerService,
    private sharedService: D07SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    this.allBags = this.sharedService.getParsedInput(rawInput);

    const allColors = this.getParentBags('shiny gold', []);

    let colorsToCheck = allColors;

    while (true) {
      let newColors: string[] = [];
      colorsToCheck.forEach((color) => {
        newColors = newColors.concat(this.getParentBags(color, allColors));
      });

      colorsToCheck = [];
      newColors.forEach((color) => {
        if (!allColors.includes(color)) {
          allColors.push(color);
          colorsToCheck.push(color);
        }
      });

      if (newColors.length == 0) {
        break;
      }
    }

    const calculationTime = this.timerService.getTime();
    return {
      result:
        'Number of bags that can contain "shiny gold" bag: ' + allColors.length,
      calculationTime: calculationTime,
    };
  }

  getParentBags(bagColor: string, existingColors: string[]): string[] {
    let parentColors: string[] = [];

    Object.keys(this.allBags).forEach((key) => {
      if (
        this.allBags[key] &&
        this.allBags[key][bagColor] &&
        !parentColors.includes(key) &&
        !existingColors.includes[key]
      ) {
        parentColors.push(key);
      }
    });

    return parentColors;
  }
}
