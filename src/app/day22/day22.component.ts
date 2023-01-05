import { Component, OnInit } from '@angular/core';
import { D22InputService } from './d22-input.service';
import { D22P01Service } from './d22-p01.service';
import { D22P02Service } from './d22-p02.service';

@Component({
  selector: 'app-day22',
  templateUrl: './day22.component.html',
  styleUrls: ['./day22.component.css']
})
export class Day22Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D22InputService,
    private part01Service: D22P01Service,
    private part02Service: D22P02Service
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
