import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D08SharedService {
  constructor() {}

  getParsedInput(
    rawInput: string
  ): { [s: string]: { command: string; value: number } } {
    const splittedLines = rawInput.split('\n');

    const instructions = {};

    for (let i = 0; i < splittedLines.length; i++) {
      const splittedLine = splittedLines[i].split(' ');
      const instruction = splittedLine[0];
      const val = parseInt(splittedLine[1]);

      instructions[i] = {
        command: instruction,
        value: val,
      };
    }

    return instructions;
  }

  getChangedParsedInput(
    rawInput: string,
    changePosition: number
  ): { [s: string]: { command: string; value: number } } {
    const splittedLines = rawInput.split('\n');

    const instructions = {};

    for (let i = 0; i < splittedLines.length; i++) {
      const splittedLine = splittedLines[i].split(' ');
      let instruction = splittedLine[0];
      const val = parseInt(splittedLine[1]);

      if (i === changePosition) {
        instruction = instruction === 'nop' ? 'jmp' : 'nop';
      }

      instructions[i] = {
        command: instruction,
        value: val,
      };
    }

    return instructions;
  }

  getInputLength(rawInput: string): number {
    return rawInput.split('\n').length;
  }
}
