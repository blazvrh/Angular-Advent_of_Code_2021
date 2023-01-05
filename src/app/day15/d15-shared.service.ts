import { Injectable } from '@angular/core';

interface NumberPositions {
  lastPostion: number;
  prevPosition?: number;
}

@Injectable({
  providedIn: 'root',
})
export class D15SharedService {
  constructor() {}

  getParsedInput(rawInput: string) {
    const numbers = rawInput.split(',');

    const input = {};

    for (let i = 0; i < numbers.length; i++) {
      let numPos: NumberPositions = {
        lastPostion: i + 1,
      };
      input[parseInt(numbers[i])] = numPos;
    }

    return input;
  }
}
