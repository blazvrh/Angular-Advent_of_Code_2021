import { Component, OnInit } from '@angular/core';
import { D16InputService } from './d16-input.service';
import { D16P01Service } from './d16-p01.service';
import { D16P02Service } from './d16-p02.service';

@Component({
  selector: 'app-day16',
  templateUrl: './day16.component.html',
  styleUrls: ['./day16.component.css'],
})
export class Day16Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D16InputService,
    private part01Service: D16P01Service,
    private part02Service: D16P02Service
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
