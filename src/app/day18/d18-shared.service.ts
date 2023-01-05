import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D18SharedService {
  constructor() {}

  getParsedInput(rawInput: string) {
    const lines = rawInput.split('\n');

    const expressions = [];
    for (let line of lines) {
      expressions.push(line.replace(/ /g, ''));
    }

    return expressions;
  }

  getSumOfArray(numbers: number[]) {
    return numbers.reduce((a, b) => a + b, 0);
  }
}
