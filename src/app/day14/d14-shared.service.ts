import { Injectable } from '@angular/core';

export interface Command {
  commandType: string;
  maskValue?: string;
  memoryLocation?: number;
  newMemoryValue?: number;
}

@Injectable({
  providedIn: 'root',
})
export class D14SharedService {
  constructor() {}

  getParsedInput(rawInput: string): Command[] {
    const lines = rawInput.split('\n');

    const commands = [];

    for (let line of lines) {
      const keyVal = line.split(' = ');
      const key = keyVal[0];
      const val = keyVal[1];

      const command: Command = {
        commandType: '',
      };
      if (key === 'mask') {
        command.commandType = 'changeMask';
        command.maskValue = val;
      } else {
        const mem = key.replace('mem[', '').replace(']', '');
        command.commandType = 'updateMemory';
        command.memoryLocation = parseInt(mem);
        command.newMemoryValue = parseInt(val);
      }

      commands.push(command);
    }

    return commands;
  }
}
