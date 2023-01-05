import { Component, OnInit } from '@angular/core';
import { D18InputService } from './d18-input.service';
import { D18P01Service } from './d18-p01.service';
import { D18P02Service } from './d18-p02.service';

@Component({
  selector: 'app-day18',
  templateUrl: './day18.component.html',
  styleUrls: ['./day18.component.css'],
})
export class Day18Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D18InputService,
    private part01Service: D18P01Service,
    private part02Service: D18P02Service
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
