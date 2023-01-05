import { Component, OnInit } from '@angular/core';

import { D02InputService } from './d02-input.service';
import { D02P01Service } from './d02-p01.service';
import { D02P02Service } from './d02-p02.service';

@Component({
  selector: 'app-day02',
  templateUrl: './day02.component.html',
  styleUrls: ['./day02.component.css'],
})
export class Day02Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D02InputService,
    private part01Service: D02P01Service,
    private part02Service: D02P02Service
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
