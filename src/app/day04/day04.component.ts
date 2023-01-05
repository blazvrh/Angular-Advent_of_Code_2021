import { Component, OnInit } from '@angular/core';
import { D04InputService } from './d04-input.service';
import { D04P01Service } from './d04-p01.service';
import { D04P02Service } from './d04-p02.service';

@Component({
  selector: 'app-day04',
  templateUrl: './day04.component.html',
  styleUrls: ['./day04.component.css']
})
export class Day04Component implements OnInit {

  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D04InputService,
    private part01Service: D04P01Service,
    private part02Service: D04P02Service
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
