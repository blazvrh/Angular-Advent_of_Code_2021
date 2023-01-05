import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D08SharedService } from './d08-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D08P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D08SharedService
  ) {}

  instructions: { [s: string]: { command: string; value: number } };
  visitedInstructions: number[] = [];
  accumulatorValue = 0;

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    this.instructions = this.sharedService.getParsedInput(rawInput);

    let position = 0;
    const visitedPositions = { 0: true };

    while (true) {
      position = this.getNewPostion(position);

      if (visitedPositions[position]) {
        break;
      } else {
        this.executeCommand(position);
        visitedPositions[position] = true;
      }
    }

    const calculationTime = this.timerService.getTime();
    return {
      result:
        'Value is in the accumulator: ' + this.accumulatorValue.toString(),
      calculationTime: calculationTime,
    };
  }

  getNewPostion(commandPosition: number) {
    const command = this.instructions[commandPosition].command;
    const param = this.instructions[commandPosition].value;

    switch (command) {
      case 'acc':
        return commandPosition + 1;
      case 'jmp':
        return commandPosition + param;
      case 'nop':
        return commandPosition + 1;

      default:
        return -1;
    }
  }

  private executeCommand(commandPosition: number) {
    const command = this.instructions[commandPosition].command;
    const param = this.instructions[commandPosition].value;

    switch (command) {
      case 'acc':
        this.accumulatorValue += param;
        return;
      case 'jmp':
        return;
      case 'nop':
        return;

      default:
        return;
    }
  }
}
