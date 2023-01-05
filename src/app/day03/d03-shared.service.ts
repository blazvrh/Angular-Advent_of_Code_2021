import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D03SharedService {
  constructor() {}

  getParsedInput(rawInput: string) {
    const splittedInput = rawInput.split('\n');
    const parsedInput = {};

    for (let x = 0; x < splittedInput[0].length; x++) {
      for (let y = 0; y < splittedInput.length; y++) {
        if (!parsedInput[x.toString()]) {
          parsedInput[x.toString()] = {};
        }

        parsedInput[x.toString()][y.toString()] = {
          x: x,
          y: y,
          isTree: splittedInput[y][x] === '#',
        };
      }
    }
    return {
      input: parsedInput,
      xMax: splittedInput[0].length,
      yMax: splittedInput.length,
    };
  }
}
