import { Component, OnInit } from '@angular/core';
import { D24InputService } from './d24-input.service';
import { D24P02Service } from './d24-p02.service';
import { D24P01Service } from './d24-p01.service';

@Component({
  selector: 'app-day24',
  templateUrl: './day24.component.html',
  styleUrls: ['./day24.component.css']
})
export class Day24Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D24InputService,
    private part01Service: D24P01Service,
    private part02Service: D24P02Service
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
