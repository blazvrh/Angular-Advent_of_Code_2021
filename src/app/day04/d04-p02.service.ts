import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D04SharedService } from './d04-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D04P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D04SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const passports = this.sharedService.getParsedInput(rawInput);

    let validPassports = 0;

    passports.forEach((passport) => {
      let isValid =
        this.isBirthYearValid(passport.byr) &&
        this.isIssueYearValid(passport.iyr) &&
        this.isExpirationYearValid(passport.eyr) &&
        this.isHeightValid(passport.hgt) &&
        this.isHairColorValid(passport.hcl) &&
        this.isEyeColorValid(passport.ecl) &&
        this.isPassportIdValid(passport.pid) &&
        this.isCountryIdValid(passport.cid);

      // console.log([
      //   this.isBirthYearValid(passport.byr),
      //   this.isIssueYearValid(passport.iyr),
      //   this.isExpirationYearValid(passport.eyr),
      //   this.isHeightValid(passport.hgt),
      //   this.isHairColorValid(passport.hcl),
      //   this.isEyeColorValid(passport.ecl),
      //   this.isPassportIdValid(passport.pid),
      //   this.isCountryIdValid(passport.cid),
      // ]);

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

  private isBirthYearValid(byr: string): boolean {
    if (byr == null || byr.length !== 4) {
      return false;
    }

    const parsedYear = parseInt(byr);
    if (parsedYear < 1920 || parsedYear > 2002) {
      return false;
    }

    return true;
  }
  private isIssueYearValid(iyr: string): boolean {
    if (iyr == null || iyr.length !== 4) {
      return false;
    }

    const parsedYear = parseInt(iyr);
    if (parsedYear < 2010 || parsedYear > 2020) {
      return false;
    }

    return true;
  }
  private isExpirationYearValid(eyr: string): boolean {
    if (eyr == null || eyr.length !== 4) {
      return false;
    }

    const parsedYear = parseInt(eyr);
    if (parsedYear < 2020 || parsedYear > 2030) {
      return false;
    }

    return true;
  }
  private isHeightValid(hgt: string): boolean {
    if (hgt == null) {
      return false;
    }

    if (hgt.includes('cm')) {
      const parsedHeight = parseInt(hgt.replace('cm', ''));
      if (parsedHeight < 150 || parsedHeight > 193) {
        return false;
      } else {
        return true;
      }
    } else if (hgt.includes('in')) {
      const parsedHeight = parseInt(hgt.replace('in', ''));

      return !(parsedHeight < 59 || parsedHeight > 76);
    } else {
      return false;
    }
  }
  private isHairColorValid(hcl: string): boolean {
    if (hcl == null || hcl.length !== 7 || hcl[0] !== '#') {
      return false;
    }

    return /^[a-z0-9]+$/.test(hcl.substr(1, 6));
  }
  private isEyeColorValid(ecl: string): boolean {
    if (ecl == null) {
      return false;
    }

    const allowedColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    return allowedColors.includes(ecl);
  }
  private isPassportIdValid(pid: string): boolean {
    if (pid == null || pid.length !== 9) {
      return false;
    }

    return /^[0-9]+$/.test(pid);
  }
  private isCountryIdValid(cid: string): boolean {
    return true;
  }
}
