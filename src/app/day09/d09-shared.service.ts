import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D09SharedService {
  constructor() {}

  getParsedInput(rawInput: string): number[] {
    const splittedLines = rawInput.split('\n');

    const arr: number[] = [];
    splittedLines.forEach((line) => {
      arr.push(parseInt(line))
    });

    return arr;
  }
}
