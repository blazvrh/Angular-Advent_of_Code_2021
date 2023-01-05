import { Component, OnInit } from '@angular/core';
import { D13InputService } from './d13-input.service';
import { D13P01Service } from './d13-p01.service';
import { D13P02Service } from './d13-p02.service';

@Component({
  selector: 'app-day13',
  templateUrl: './day13.component.html',
  styleUrls: ['./day13.component.css'],
})
export class Day13Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D13InputService,
    private part01Service: D13P01Service,
    private part02Service: D13P02Service
  ) {}

  ngOnInit(): void {
    const rawInput = this.inputService.getRawInput();

    const part01Result = this.part01Service.getResult(rawInput);
    this.part01ResultStr =
      part01Result.result +
      '\n' +
      part01Result.calculationTime +
      ' miliseconds';

    const part02Result = this.part02Service.getResult(rawInput);
    this.part02ResultStr =
      part02Result.result +
      '\n' +
      part02Result.calculationTime +
      ' miliseconds';
  }
}
