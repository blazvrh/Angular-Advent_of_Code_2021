import { Component, OnInit } from '@angular/core';
import { D21InputService } from './d21-input.service';
import { D21P01Service } from './d21-p01.service';
import { D21P02Service } from './d21-p02.service';

@Component({
  selector: 'app-day21',
  templateUrl: './day21.component.html',
  styleUrls: ['./day21.component.css'],
})
export class Day21Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D21InputService,
    private part01Service: D21P01Service,
    private part02Service: D21P02Service
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
