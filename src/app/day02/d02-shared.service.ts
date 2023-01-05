import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D02SharedService {
  parsedInput: {
    min: number;
    max: number;
    char: string;
    password: string;
  }[] = [];

  constructor() {}

  getParsedInput(rawInput: string) {
    if ((this.parsedInput.length = 0)) {
      return this.parsedInput;
    }

    this.parseInput(rawInput);
    return this.parsedInput;
  }

  private parseInput(rawInput: string) {
    const splittedInput = rawInput.split('\n');

    splittedInput.forEach((element) => {
      const password = element.split(': ')[1];
      const policy = element.split(':')[0];
      const char = policy[policy.length - 1];

      const policyLen = policy.split(' ')[0].split('-');
      const min = policyLen[0];
      const max = policyLen[1];

      this.parsedInput.push({
        min: parseInt(min),
        max: parseInt(max),
        char: char,
        password: password,
      });
    });
  }
}
