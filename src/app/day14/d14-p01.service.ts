import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D14SharedService } from './d14-shared.service';

interface MaskValue {
  position: number;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class D14P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D14SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const commands = this.sharedService.getParsedInput(rawInput);

    let mask: string;
    const memory: { [s: string]: string } = {};

    for (let command of commands) {
      if (command.commandType === 'changeMask') {
        mask = command.maskValue;
      } else if (command.commandType === 'updateMemory') {
        const newMemoryValue = this.getMemoryValue(
          command.newMemoryValue,
          mask
        );
        memory[command.memoryLocation] = newMemoryValue;
      }
    }

    let sum = 0;
    for (let value of Object.values(memory)) {
      sum += parseInt(value, 2);
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: sum.toString(),
      calculationTime: calculationTime,
    };
  }

  private getMemoryValue(numericValue: number, mask: string): string {
    let bitValue = numericValue.toString(2);

    for (let i = bitValue.length; i < 36; i++) {
      bitValue = '0' + bitValue;
    }

    const maskValues = this.getParsedMask(mask);

    for (let maskValue of maskValues) {
      bitValue = this.replaceAt(bitValue, maskValue.position, maskValue.value);
    }

    return bitValue;
  }

  private getParsedMask(mask: string): MaskValue[] {
    const parsedMask: MaskValue[] = [];
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === 'X') {
        continue;
      }
      const maskVal: MaskValue = {
        position: i,
        value: mask[i],
      };
      parsedMask.push(maskVal);
    }

    return parsedMask;
  }

  replaceAt(string: string, index: number, replacement: string) {
    return (
      string.substr(0, index) +
      replacement +
      string.substr(index + replacement.length)
    );
  }
}
