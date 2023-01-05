import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class D13InputService {
  inputStr = `1000434
17,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,983,x,29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,23,x,x,x,x,x,x,x,397,x,x,x,x,x,37,x,x,x,x,x,x,13`

  testInput = `939
7,13,x,x,59,x,31,19`

  constructor() { }

  getRawInput(): string {
    return this.inputStr;
    // return this.testInput;
  }
}
