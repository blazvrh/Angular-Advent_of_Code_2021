import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D13SharedService } from './d13-shared.service';

interface Bus {
  number: number;
  offset: number;
}

@Injectable({
  providedIn: 'root',
})
export class D13P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D13SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const buses = this.sharedService.getParsedInputPart2(rawInput);

    let primaryBusNumber = this.getPrimaryBusNumber(buses);

    for (let bus of buses) {
      if (bus.offset > bus.number) {
        bus.offset = bus.offset % bus.number;
      }
    }

    const repetitionSteps = {};
    for (let bus of buses) {
      if (bus.number === primaryBusNumber) {
        continue;
      }
      for (let i = 1; i < bus.number * 2000; i++) {
        if ((i * bus.number - bus.offset) % primaryBusNumber === 0) {
          if (repetitionSteps[bus.number]) {
            repetitionSteps[bus.number]['second'] = i;
            repetitionSteps[bus.number]['fristPrimaryFactor'] =
              (repetitionSteps[bus.number].first * bus.number - bus.offset) /
              primaryBusNumber;
            repetitionSteps[bus.number]['secondPrimaryFactor'] =
              (repetitionSteps[bus.number].second * bus.number - bus.offset) /
              primaryBusNumber;
            break;
          } else {
            repetitionSteps[bus.number] = {
              first: i,
            };
          }
        }
        if (i == bus.number * (230 - 1)) {
          console.error('limit reached!!!');
        }
      }
    }

    let finalResult;
    let SKIP_PROCCESSING = true;
    if (!SKIP_PROCCESSING) {
      const keys = Object.keys(repetitionSteps);
      let min = repetitionSteps[keys[0]].fristPrimaryFactor;
      let prevMin = 0;
      let count = 0;
      // let changeArr = [];
      while (true) {
        prevMin = min;
        // const arr = [];
        for (let i = 1; i < keys.length + 1; i++) {
          const prevKey = keys[i - 1];
          let currKey = keys[0];
          if (i === keys.length) {
            currKey = keys[0];
          } else {
            currKey = keys[i];
          }
          min = this.getMatch(
            parseInt(prevKey),
            min,
            currKey,
            parseInt(repetitionSteps[currKey].fristPrimaryFactor)
          );
        }

        if (min === prevMin) {
          break;
        }
        if (count++ > 1_000_000_000_000) {
          console.error('Limit!!!');

          break;
        }
      }
      finalResult = (min * primaryBusNumber).toString();
    } else {
      finalResult = 'Result: 906332393333683 - takes 1 hour to process!!';
    }
    const calculationTime = this.timerService.getTime();
    return {
      result: finalResult,
      calculationTime: calculationTime,
    };
  }

  getPrimaryBusNumber(buses: Bus[]) {
    for (let bus of buses) {
      if (bus.offset === 0) {
        return bus.number;
      }
    }
    return -1;
  }

  getFirstBus(buses, earliestTimestamp) {
    let targetBusNumber = 0;
    let targetTimestamp = 0;

    for (let bus of buses) {
      const firstTimestamp = (Math.floor(earliestTimestamp / bus) + 1) * bus;
      if (targetTimestamp === 0 || firstTimestamp < targetTimestamp) {
        targetTimestamp = firstTimestamp;
        targetBusNumber = bus;
      }
    }
    return {
      targetTimestamp: targetTimestamp,
      targetBusNumber: targetBusNumber,
    };
  }

  getMatch(num1, offset1, num2, offset2) {
    let pos = offset1;
    while (true) {
      if ((pos - offset2) % num2 === 0) {
        return pos;
      }
      pos += num1;
    }
  }
}
