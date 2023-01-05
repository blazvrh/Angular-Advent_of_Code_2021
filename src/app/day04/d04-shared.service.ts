import { Injectable } from '@angular/core';

class Passport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
}

@Injectable({
  providedIn: 'root',
})
export class D04SharedService {
  constructor() {}

  getParsedInput(rawInput: string) {
    let passport = new Passport();
    const passports: Passport[] = [];

    const splittedLines = rawInput.split('\n');

    for (let i = 0; i < splittedLines.length; i++) {
      if (splittedLines[i] === '') {
        passports.push(passport);
        passport = new Passport();
        continue;
      }

      const fields = splittedLines[i].split(' ');

      fields.forEach((field) => {
        const keyVal = field.split(':');
        const key = keyVal[0];
        const val = keyVal[1];
        passport[key] = val;
      });
    }

    return passports;
  }
}
