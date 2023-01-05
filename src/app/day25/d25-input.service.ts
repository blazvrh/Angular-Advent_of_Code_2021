import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D25InputService {
  inputStr = `19774466
7290641`;

  testInput = `5764801
17807724`;

  constructor() {}

  getRawInput(): string {
    return this.inputStr;
    return this.testInput;
  }
}
