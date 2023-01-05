import { Component, OnInit } from '@angular/core';
import { D07InputService } from './d07-input.service';
import { D07P01Service } from './d07-p01.service';
import { D07P02Service } from './d07-p02.service';

@Component({
  selector: 'app-day07',
  templateUrl: './day07.component.html',
  styleUrls: ['./day07.component.css']
})
export class Day07Component implements OnInit {

  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D07InputService,
    private part01Service: D07P01Service,
    private part02Service: D07P02Service
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
