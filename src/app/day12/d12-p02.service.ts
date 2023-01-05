import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D12SharedService } from './d12-shared.service';

export class Boat {
  x = 0;
  y = 0;
  wayPoint = {
    x: 10,
    y: 1,
  };

  executeCommand(command: { direction: string; value: number }) {
    if (command.direction === 'L' || command.direction === 'R') {
      this.roateWayPoint(command.direction, command.value);
    } else if (command.direction === 'F') {
      this.moveShip(command.value);
    } else {
      this.moveWayPoint(command.direction, command.value);
    }
  }

  roateWayPoint(direction: string, value: number) {
    const currentDirection = this.getSkyDirectionCoor();

    currentDirection.x.direction = this.getRotatedDirection(
      currentDirection.x.direction,
      direction,
      value
    );
    currentDirection.y.direction = this.getRotatedDirection(
      currentDirection.y.direction,
      direction,
      value
    );

    this.setWayPointCoordinates(currentDirection.x);
    this.setWayPointCoordinates(currentDirection.y);
  }

  getSkyDirectionCoor() {
    let xDirection;
    let yDirection;

    if (this.wayPoint.x >= 0) {
      xDirection = 'E';
    } else {
      xDirection = 'W';
    }

    if (this.wayPoint.y >= 0) {
      yDirection = 'N';
    } else {
      yDirection = 'S';
    }

    return {
      x: {
        direction: xDirection,
        value: Math.abs(this.wayPoint.x),
      },
      y: {
        direction: yDirection,
        value: Math.abs(this.wayPoint.y),
      },
    };
  }

  getRotatedDirection(
    currentSkyDirection: string,
    direction: string,
    value: number
  ): string {
    const skyDirections = ['E', 'S', 'W', 'N'];
    const currentDirectionIndex = skyDirections.indexOf(currentSkyDirection);

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
    return skyDirections[newDirectionIndex];
  }

  setWayPointCoordinates(directions: { direction: string; value: number }) {
    if (directions.direction === 'N') {
      this.wayPoint.y = directions.value;
    } else if (directions.direction === 'S') {
      this.wayPoint.y = -directions.value;
    } else if (directions.direction === 'E') {
      this.wayPoint.x = directions.value;
    } else if (directions.direction === 'W') {
      this.wayPoint.x = -directions.value;
    } else {
      console.error('Invalid');
    }
  }

  moveWayPoint(direction: string, value: number) {
    switch (direction) {
      case 'N':
        this.wayPoint.y += value;
        break;
      case 'S':
        this.wayPoint.y -= value;
        break;
      case 'E':
        this.wayPoint.x += value;
        break;
      case 'W':
        this.wayPoint.x -= value;
        break;

      default:
        console.error('Wrong direction!!!');
        break;
    }
  }

  moveShip(value: number) {
    this.x += value * this.wayPoint.x;
    this.y += value * this.wayPoint.y;
  }

  getManhattanDistance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}
@Injectable({
  providedIn: 'root',
})
export class D12P02Service {
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
