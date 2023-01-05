import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D10SharedService {
  constructor() {}

  getParsedInput(rawInput: string): number[] {
    const splittedLines = rawInput.split('\n');

    const numbers: number[] = [];

    splittedLines.forEach(line => {
      numbers.push(parseInt(line))
    });

    return numbers;
  }
}
