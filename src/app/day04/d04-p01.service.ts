import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D04SharedService } from './d04-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D04P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D04SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const neededKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const passports = this.sharedService.getParsedInput(rawInput);

    let validPassports = 0;

    passports.forEach((passport) => {
      let isValid = true;
      neededKeys.forEach((neededKey) => {
        if (passport[neededKey] == null) {
          isValid = false;
          return;
        }
      });
      if (isValid) {
        validPassports++;
      }
    });

    const calculationTime = this.timerService.getTime();
    return {
      result: 'Number of valid passports: ' + validPassports.toString(),
      calculationTime: calculationTime,
    };
  }
}
