import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TimerService } from '../shared/timer.service';
import { D11SharedService } from './d11-shared.service';

class Seat {
  adjacentSeatKeys: string[] = [];

  constructor(
    private x: number,
    private y: number,
    public isTaken: boolean,
    public newState: boolean
  ) {}

  position(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  setAdjacentSeatCoor(keys: string[]) {
    for (let x = this.x - 1; x < this.x + 2; x++) {
      for (let y = this.y - 1; y < this.y + 2; y++) {
        if (x === this.x && y === this.y) {
          continue;
        }

        const key = x.toString() + ':' + y.toString();
        if (!keys.includes(key)) {
          continue;
        }

        this.adjacentSeatKeys.push(key);
      }
    }
  }

  setNewState(seats: Seat[]) {
    let takenSeatCount = 0;

    for (let s of seats) {
      if (s.isTaken) {
        takenSeatCount++;
      }
    }

    if (this.isTaken && takenSeatCount > 3) {
      this.newState = false;
    } else if (!this.isTaken && takenSeatCount === 0) {
      this.newState = true;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class D11P01Service {
  sbj = new Subject<{ result: string; calculationTime: number }>();

  constructor(
    private timerService: TimerService,
    private sharedService: D11SharedService
  ) {}

  async getResult(rawInput: string) {
    this.timerService.startTimer();

    let currSeatMap = this.sharedService.getParsedInput(rawInput);
    let seatMap: { [s: string]: Seat } = {};

    for (let key of Object.keys(currSeatMap)) {
      const split = key.split(':');
      const x = parseInt(split[0]);
      const y = parseInt(split[1]);

      seatMap[key] = new Seat(x, y, false, false);
    }

    for (let s of Object.values(seatMap)) {
      s.setAdjacentSeatCoor(Object.keys(seatMap));
    }

    let loopCounter = 0;

    while (true) {
      for (let s of Object.values(seatMap)) {
        const adjacentSeats = [];
        for (let key of s.adjacentSeatKeys) {
          adjacentSeats.push(seatMap[key]);
        }
        s.setNewState([...adjacentSeats]);
      }

      let isSame = true;
      for (let s of Object.values(seatMap)) {
        if (s.isTaken !== s.newState) {
          s.isTaken = s.newState;
          isSame = false;
        }
      }

      if (isSame) {
        break;
      }

      loopCounter++;
      if (loopCounter > 1000) {
        console.error(loopCounter, 'loop reached');
        break;
      }
    }

    let takenSeets = 0;
    for (let s of Object.values(seatMap)) {
      if (s.isTaken) {
        takenSeets++;
      }
    }

    const calculationTime = this.timerService.getTime();
    this.sbj.next({
      result: takenSeets.toString(),
      calculationTime: calculationTime,
    });
  }
}
