import { Component, OnInit } from '@angular/core';
import { D20InputService } from './d20-input.service';
import { D20P01Service } from './d20-p01.service';
import { D20P02Service } from './d20-p02.service';

@Component({
  selector: 'app-day20',
  templateUrl: './day20.component.html',
  styleUrls: ['./day20.component.css']
})
export class Day20Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D20InputService,
    private part01Service: D20P01Service,
    private part02Service: D20P02Service
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
