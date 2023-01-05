import { Component, OnInit } from '@angular/core';
import { D19InputService } from './d19-input.service';
import { D19P01Service } from './d19-p01.service';
import { D19P02Service } from './d19-p02.service';

@Component({
  selector: 'app-day19',
  templateUrl: './day19.component.html',
  styleUrls: ['./day19.component.css'],
})
export class Day19Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D19InputService,
    private part01Service: D19P01Service,
    private part02Service: D19P02Service
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
