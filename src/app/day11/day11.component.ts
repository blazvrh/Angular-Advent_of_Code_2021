import { Component, OnInit } from '@angular/core';
import { D11InputService } from '../day11/d11-input.service';
import { D11P01Service } from '../day11/d11-p01.service';
import { D11P02Service } from '../day11/d11-p02.service';

@Component({
  selector: 'app-day11',
  templateUrl: './day11.component.html',
  styleUrls: ['./day11.component.css'],
})
export class Day11Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D11InputService,
    private part01Service: D11P01Service,
    private part02Service: D11P02Service
  ) {}

  ngOnInit(): void {
    const rawInput = this.inputService.getRawInput();

    this.part01Service.sbj.subscribe((part01Result) => {
      this.part01ResultStr =
        part01Result.result +
        '\n' +
        part01Result.calculationTime +
        ' miliseconds';
    });

    this.part01Service.getResult(rawInput);

    const part02Result = this.part02Service.getResult(rawInput);
    this.part02ResultStr =
      part02Result.result +
      '\n' +
      part02Result.calculationTime +
      ' miliseconds';
  }
}
