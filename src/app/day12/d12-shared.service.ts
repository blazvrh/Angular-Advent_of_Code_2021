import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D12SharedService {
  constructor() {}

  getParsedInput(rawInput: string): { direction: string; value: number }[] {
    const splittedLines = rawInput.split('\n');

    const directions = [];

    for (let line of splittedLines) {
      const direction = line[0];
      const value = parseInt(line.substr(1));
      directions.push({ direction: direction, value: value });
    }

    return directions;
  }
}
