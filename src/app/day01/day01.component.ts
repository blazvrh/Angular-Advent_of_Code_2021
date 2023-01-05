import { Component, OnInit } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D01InputService } from './d01-input.service';
import { D01P01Service } from './d01-p01.service';
import { D01P02Service } from './d01-p02.service';

@Component({
  selector: 'app-day01',
  templateUrl: './day01.component.html',
  styleUrls: ['./day01.component.css'],
})
export class Day01Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D01InputService,
    private part01Service: D01P01Service,
    private part02Service: D01P02Service
  ) {}

  ngOnInit(): void {
    const rawInput = this.inputService.getKrhoInput();

    const part01Result = this.part01Service.getResult(rawInput);
    this.part01ResultStr = this.resultToString(part01Result);

    const part02Result = this.part02Service.getResult(rawInput);
    this.part02ResultStr = this.resultToString(part02Result);
  }

  private resultToString(results: {
    result: string;
    nums: string[];
    calculationTime: number;
  }): string {
    if (results.nums.length > 0) {
      return (
        results.nums.join(' * ') +
        ' = ' +
        results.result +
        '\n' +
        results.calculationTime +
        ' miliseconds'
      );
    } else {
      return results.result + '\n' + results.calculationTime + 'miliseconds';
    }
  }
}
