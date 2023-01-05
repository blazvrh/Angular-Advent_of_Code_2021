import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D13SharedService } from './d13-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D13P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D13SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const input = this.sharedService.getParsedInput(rawInput);

    let targetBusNumber = 0;
    let targetTimestamp = 0;

    for (let bus of input.buses) {
      const firstTimestamp =
        (Math.floor(input.earliestTimestamp / bus) + 1) * bus;
      if (targetTimestamp === 0 || firstTimestamp < targetTimestamp) {
        targetTimestamp = firstTimestamp;
        targetBusNumber = bus;
      }
    }

    const result =
      (targetTimestamp - input.earliestTimestamp) * targetBusNumber;

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
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
}
