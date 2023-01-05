import { Component, OnInit } from '@angular/core';
import { D05InputService } from './d05-input.service';
import { D05P01Service } from './d05-p01.service';
import { D05P02Service } from './d05-p02.service';

@Component({
  selector: 'app-day05',
  templateUrl: './day05.component.html',
  styleUrls: ['./day05.component.css']
})
export class Day05Component implements OnInit {

  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D05InputService,
    private part01Service: D05P01Service,
    private part02Service: D05P02Service
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
