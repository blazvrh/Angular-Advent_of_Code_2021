import { Component, OnInit } from '@angular/core';
import { D23InputService } from './d23-input.service';
import { D23P01Service } from './d23-p01.service';
import { D23P02Service } from './d23-p02.service';

@Component({
  selector: 'app-day23',
  templateUrl: './day23.component.html',
  styleUrls: ['./day23.component.css']
})
export class Day23Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D23InputService,
    private part01Service: D23P01Service,
    private part02Service: D23P02Service
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
