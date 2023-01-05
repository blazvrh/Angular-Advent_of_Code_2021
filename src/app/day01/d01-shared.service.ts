import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D01SharedService {
  constructor() {}

  getParsedInput(rawInput: string): number[] {
    const splittedInput = rawInput.split('\n');
    const parsedInput = splittedInput.map((x: string) => parseInt(x));

    return parsedInput;
  }
}
