import { Component, OnInit } from '@angular/core';
import { D09InputService } from './d09-input.service';
import { D09P01Service } from './d09-p01.service';
import { D09P02Service } from './d09-p02.service';

@Component({
  selector: 'app-day09',
  templateUrl: './day09.component.html',
  styleUrls: ['./day09.component.css']
})
export class Day09Component implements OnInit {

  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D09InputService,
    private part01Service: D09P01Service,
    private part02Service: D09P02Service
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
