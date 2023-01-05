import { Component, OnInit } from '@angular/core';
import { D17InputService } from './d17-input.service';
import { D17P01Service } from './d17-p01.service';
import { D17P02Service } from './d17-p02.service';

@Component({
  selector: 'app-day17',
  templateUrl: './day17.component.html',
  styleUrls: ['./day17.component.css'],
})
export class Day17Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D17InputService,
    private part01Service: D17P01Service,
    private part02Service: D17P02Service
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
