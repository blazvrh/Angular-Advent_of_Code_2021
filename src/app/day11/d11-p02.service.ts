import { Injectable } from '@angular/core';
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

  setAdjacentSeatCoor(allKeys: string[]) {
    const keys = [...allKeys]
    const index = keys.indexOf(this.x.toString() + ':' + this.y.toString());
    if (index > -1) {
      keys.splice(index, 1);
    }

    for (let x = this.x; x > -1; x--) {
      const key = x.toString() + ':' + this.y.toString();
      if (keys.includes(key)) {
        this.adjacentSeatKeys.push(key);
        break;
      }
    }
    for (let x = this.x; x < 100; x++) {
      const key = x.toString() + ':' + this.y.toString();
      if (keys.includes(key)) {
        this.adjacentSeatKeys.push(key);
        break;
      }
    }
    for (let y = this.y; y > -1; y--) {
      const key = this.x.toString() + ':' + y.toString();
      if (keys.includes(key)) {
        this.adjacentSeatKeys.push(key);
        break;
      }
    }
    for (let y = this.y; y < 100; y++) {
      const key = this.x.toString() + ':' + y.toString();
      if (keys.includes(key)) {
        this.adjacentSeatKeys.push(key);
        break;
      }
    }

    let y;
    let x;
    for (x = this.x, y = this.y; x > -1 && y > -1; x--, y--) {
      const key = x.toString() + ':' + y.toString();
      if (keys.includes(key)) {
        this.adjacentSeatKeys.push(key);
        break;
      }
    }
    for (x = this.x, y = this.y; x < 100 && y > -1; x++, y--) {
      const key = x.toString() + ':' + y.toString();
      if (keys.includes(key)) {
        this.adjacentSeatKeys.push(key);
        break;
      }
    }
    for (x = this.x, y = this.y; x > -1 && y < 100; x--, y++) {
      const key = x.toString() + ':' + y.toString();
      if (keys.includes(key)) {
        this.adjacentSeatKeys.push(key);
        break;
      }
    }
    for (x = this.x, y = this.y; x < 100 && y < 100; x++, y++) {
      const key = x.toString() + ':' + y.toString();
      if (keys.includes(key)) {
        this.adjacentSeatKeys.push(key);
        break;
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

    if (this.isTaken && takenSeatCount > 4) {
      this.newState = false;
    } else if (!this.isTaken && takenSeatCount === 0) {
      this.newState = true;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class D11P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D11SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
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
    return {
      result: takenSeets.toString(),
      calculationTime: calculationTime,
    };
  }
}
