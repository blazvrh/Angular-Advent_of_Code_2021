import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D12SharedService } from './d12-shared.service';

export class Boat {
  x = 0;
  y = 0;
  direction = 'E';

  executeCommand(command: { direction: string; value: number }) {
    if (command.direction === 'L' || command.direction === 'R') {
      this.changeDirection(command.direction, command.value);
    } else {
      this.moveShip(command.direction, command.value);
    }
  }

  changeDirection(direction: string, value: number) {
    const skyDirections = ['E', 'S', 'W', 'N'];
    const currentDirectionIndex = skyDirections.indexOf(this.direction);

    const steps = value / 90;

    let newDirectionIndex;
    if (direction === 'R') {
      newDirectionIndex = (currentDirectionIndex + steps) % 4;
    } else if (direction === 'L') {
      newDirectionIndex = (currentDirectionIndex - steps) % 4;
      if (newDirectionIndex < 0) {
        newDirectionIndex += 4;
      }
    } else {
      console.error('Wrong direction!!!');
    }
    this.direction = skyDirections[newDirectionIndex];
  }

  moveShip(direction: string, value: number) {
    let moveDirection;
    if (direction === 'F') {
      moveDirection = this.direction;
    } else {
      moveDirection = direction;
    }

    switch (moveDirection) {
      case 'N':
        this.x += value;
        break;
      case 'S':
        this.x -= value;
        break;
      case 'E':
        this.y += value;
        break;
      case 'W':
        this.y -= value;
        break;

      default:
        console.error(moveDirection, 'Wrong direction');
        break;
    }
  }

  getManhattanDistance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}

@Injectable({
  providedIn: 'root',
})
export class D12P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D12SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const commands = this.sharedService.getParsedInput(rawInput);

    const boat = new Boat();

    for (let command of commands) {
      boat.executeCommand(command);
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: boat.getManhattanDistance().toString(),
      calculationTime: calculationTime,
    };
  }
}
