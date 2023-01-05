import { Component, OnInit } from '@angular/core';
import { D14InputService } from './d14-input.service';
import { D14P01Service } from './d14-p01.service';
import { D14P02Service } from './d14-p02.service';

@Component({
  selector: 'app-day14',
  templateUrl: './day14.component.html',
  styleUrls: ['./day14.component.css'],
})
export class Day14Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D14InputService,
    private part01Service: D14P01Service,
    private part02Service: D14P02Service
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
