import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D13SharedService {
  constructor() {}

  getParsedInput(rawInput: string) {
    const splittedLines = rawInput.split('\n');

    const earliestTimestamp = parseInt(splittedLines[0]);

    const splitedBusses = splittedLines[1].split(',');

    const allBusses = [];

    for (let bus of splitedBusses) {
      if (bus !== 'x') {
        allBusses.push(parseInt(bus));
      }
    }

    return {
      buses: allBusses,
      earliestTimestamp: earliestTimestamp,
    };
  }
  getParsedInputPart2(rawInput: string): { number: number; offset: number }[] {
    const splittedLines = rawInput.split('\n');

    // const earliestTimestamp = parseInt(splittedLines[0]);

    const splitedBusses = splittedLines[1].split(',');

    const allBusses = [];

    for (let i = 0; i < splitedBusses.length; i++) {
      const bus = splitedBusses[i];
      if (bus !== 'x') {
        allBusses.push({ number: parseInt(bus), offset: i });
      }
    }

    return allBusses;
  }
}
