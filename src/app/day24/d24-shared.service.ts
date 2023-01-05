import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D24SharedService {
  constructor() {}

  getParsedInput(rawInput: string) {
    const lines = rawInput.split('\n');

    const instructions: { [lineNum: number]: string[] } = {};

    for (let j = 0; j < lines.length; j++) {
      let line = lines[j];
      let i = 0;
      instructions[j] = [];
      instructions;
      while (i < line.length) {
        let instruction = line[i];
        i++;
        if (instruction === 'n' || instruction === 's') {
          instruction += line[i];
          i++;
        }

        instructions[j].push(instruction);
      }
    }

    return instructions;
  }
}
