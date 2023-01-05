import { Component, OnInit } from '@angular/core';
import { D25InputService } from './d25-input.service';
import { D25P01Service } from './d25-p01.service';

@Component({
  selector: 'app-day25',
  templateUrl: './day25.component.html',
  styleUrls: ['./day25.component.css'],
})
export class Day25Component implements OnInit {
  part01ResultStr: string;

  constructor(
    private inputService: D25InputService,
    private part01Service: D25P01Service
  ) {}

  ngOnInit(): void {
    const rawInput = this.inputService.getRawInput();

    const part01Result = this.part01Service.getResult(rawInput);
    this.part01ResultStr =
      part01Result.result +
      '\n' +
      part01Result.calculationTime +
      ' miliseconds';
  }
}
