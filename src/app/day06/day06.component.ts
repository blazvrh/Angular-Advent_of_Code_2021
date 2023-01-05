import { Component, OnInit } from '@angular/core';
import { D06InputService } from './d06-input.service';
import { D06P01Service } from './d06-p01.service';
import { D06P02Service } from './d06-p02.service';

@Component({
  selector: 'app-day06',
  templateUrl: './day06.component.html',
  styleUrls: ['./day06.component.css']
})
export class Day06Component implements OnInit {

  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D06InputService,
    private part01Service: D06P01Service,
    private part02Service: D06P02Service
    )
    {}

  ngOnInit(): void {
    const rawInput = this.inputService.getRawInput();

    const part01Result = this.part01Service.getResult(rawInput);
    this.part01ResultStr = part01Result.result + '\n' + part01Result.calculationTime + ' miliseconds';

    const part02Result = this.part02Service.getResult(rawInput);
    this.part02ResultStr = part02Result.result + '\n' + part02Result.calculationTime + ' miliseconds';
  }

}
