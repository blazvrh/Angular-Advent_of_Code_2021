import { Component, OnInit } from '@angular/core';
import { D08InputService } from './d08-input.service';
import { D08P01Service } from './d08-p01.service';
import { D08P02Service } from './d08-p02.service';

@Component({
  selector: 'app-day08',
  templateUrl: './day08.component.html',
  styleUrls: ['./day08.component.css']
})
export class Day08Component implements OnInit {

  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D08InputService,
    private part01Service: D08P01Service,
    private part02Service: D08P02Service
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
