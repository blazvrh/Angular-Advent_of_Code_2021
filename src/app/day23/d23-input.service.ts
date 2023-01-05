import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D23InputService {
  inputStr = `219347865`;

  testInput = `389125467`;

  constructor() {}

  getRawInput(): string {
    return this.inputStr;
    return this.testInput;
  }
}
