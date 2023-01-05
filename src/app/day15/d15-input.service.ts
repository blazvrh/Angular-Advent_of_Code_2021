import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D15InputService {
  inputStr = `16,11,15,0,1,7`;

  testInput = ``;

  constructor() {}

  getRawInput(): string {
    return this.inputStr;
    // return this.testInput;
  }
}
