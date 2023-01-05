import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D11SharedService {
  constructor() {}

  getParsedInput(rawInput: string): { [s: string]: string } {
    const splittedLines = rawInput.split('\n');

    const seatMap = {};

    for (let y = 0; y < splittedLines.length; y++) {
      const line = splittedLines[y];
      for (let x = 0; x < line.length; x++) {
        if (line[x] === 'L') {
          seatMap[x.toString() + ':' + y.toString()] = "L";
        }
      }
    }

    return seatMap;
  }
}
