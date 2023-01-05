import { Component, OnInit } from '@angular/core';

import { D03InputService } from './d03-input.service';
import { D03P01Service } from './d03-p01.service';
import { D03P02Service } from './d03-p02.service';

@Component({
  selector: 'app-day03',
  templateUrl: './day03.component.html',
  styleUrls: ['./day03.component.css'],
})
export class Day03Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D03InputService,
    private part01Service: D03P01Service,
    private part02Service: D03P02Service
  ) {}

  ngOnInit(): void {
    const rawInput = this.inputService.getRawInput();

    const part01Result = this.part01Service.getResult(rawInput);
    this.part01ResultStr = this.resultToString(part01Result);

    const part02Result = this.part02Service.getResult(rawInput);
    this.part02ResultStr = this.resultToString(part02Result);
  }

  private resultToString(results: {
    result: string;
    calculationTime: number;
  }): string {
    return results.result + '\n' + results.calculationTime + ' miliseconds';
  }
}
