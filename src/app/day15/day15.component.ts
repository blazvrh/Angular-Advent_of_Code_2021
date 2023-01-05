import { Component, OnInit } from '@angular/core';
import { D15InputService } from './d15-input.service';
import { D15P01Service } from './d15-p01.service';
import { D15P02Service } from './d15-p02.service';

@Component({
  selector: 'app-day15',
  templateUrl: './day15.component.html',
  styleUrls: ['./day15.component.css'],
})
export class Day15Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D15InputService,
    private part01Service: D15P01Service,
    private part02Service: D15P02Service
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
