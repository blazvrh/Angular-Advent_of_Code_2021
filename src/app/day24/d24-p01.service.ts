import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D24SharedService } from './d24-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D24P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D24SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const input = this.sharedService.getParsedInput(rawInput);

    const positions: { [s: string]: number } = {};

    for (let instructions of Object.values(input)) {
      const targetPos = this.getTargetTile(instructions);

      const strPosition = this.positionToString(targetPos);

      if (positions[strPosition] == null) {
        positions[strPosition] = 1;
      } else {
        positions[strPosition]++;
      }
    }

    let result = 0;
    for (let visits of Object.values(positions)) {
      if (visits % 2 === 1) {
        result++;
      }
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }

  getTargetTile(instructions: string[]): { x: number; y: number } {
    const position = {
      x: 0,
      y: 0,
    };

    for (let instruction of instructions) {
      switch (instruction) {
        case 'e':
          position.x += 2;
          break;
        case 'w':
          position.x -= 2;
          break;
        case 'se':
          position.x++;
          position.y--;
          break;
        case 'sw':
          position.x--;
          position.y--;
          break;
        case 'ne':
          position.x++;
          position.y++;
          break;
        case 'nw':
          position.x--;
          position.y++;
          break;

        default:
          console.error('Wuppss');

          break;
      }
    }

    return position;
  }

  positionToString(position: { x: number; y: number }): string {
    return 'x' + position.x.toString() + ',y' + position.y.toString();
  }
}
