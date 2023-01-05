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
export class D14P02Service {
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
        const memorySlots = this.getMemorySlots(command.memoryLocation, mask);

        for (let memorySlot of memorySlots) {
          memory[memorySlot] = this.getBitValue(command.newMemoryValue);
        }
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

  private getMemorySlots(memoryLocation: number, mask: string) {
    const memoryBitLocation = this.getBitValue(memoryLocation);

    const maskedLocation = this.applyMask(memoryBitLocation, mask);

    const memorySlots = this.getPermutations(maskedLocation);

    return memorySlots;
  }

  private getBitValue(numericValue: number): string {
    let bitValue = numericValue.toString(2);

    bitValue = this.appendZeros(bitValue, 36);

    return bitValue;
  }

  private appendZeros(bitValue: string, targetLength: number): string {
    let newValue = bitValue;
    for (let i = bitValue.length; i < targetLength; i++) {
      newValue = '0' + newValue;
    }
    return newValue;
  }

  private applyMask(bitValue: string, mask: string) {
    const maskValues = this.getParsedMask(mask);

    let newBitValue: string = bitValue;
    for (let maskValue of maskValues) {
      newBitValue = this.replaceAt(
        newBitValue,
        maskValue.position,
        maskValue.value
      );
    }

    return newBitValue;
  }

  private getPermutations(bitValue: string): string[] {
    let wildCardCount = 0;
    for (let i = 0; i < bitValue.length; i++) {
      if (bitValue[i] === 'X') {
        wildCardCount++;
      }
    }

    const maxVal = Math.pow(2, wildCardCount);
    const bitVariations: string[] = [];

    for (let i = 0; i <= maxVal - 1; i++) {
      const bitval = this.appendZeros(i.toString(2), wildCardCount);
      bitVariations.push(bitval);
    }

    const memoryAddresses: string[] = [];

    for (let bitVariation of bitVariations) {
      let memoryAddress = '';
      let variationCharPos = 0;
      for (let i = 0; i < bitValue.length; i++) {
        if (bitValue[i] === 'X') {
          memoryAddress += bitVariation[variationCharPos];
          variationCharPos++;
        } else {
          memoryAddress += bitValue[i];
        }
      }
      memoryAddresses.push(memoryAddress);
    }

    return memoryAddresses;
  }

  private getParsedMask(mask: string): MaskValue[] {
    const parsedMask: MaskValue[] = [];
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === '0') {
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

  private replaceAt(string: string, index: number, replacement: string) {
    return (
      string.substr(0, index) +
      replacement +
      string.substr(index + replacement.length)
    );
  }
}
