import { Component, OnInit } from '@angular/core';
import { D12InputService } from './d12-input.service';
import { D12P01Service } from './d12-p01.service';
import { D12P02Service } from './d12-p02.service';

@Component({
  selector: 'app-day12',
  templateUrl: './day12.component.html',
  styleUrls: ['./day12.component.css']
})
export class Day12Component implements OnInit {
  part01ResultStr: string;
  part02ResultStr: string;

  constructor(
    private inputService: D12InputService,
    private part01Service: D12P01Service,
    private part02Service: D12P02Service
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
