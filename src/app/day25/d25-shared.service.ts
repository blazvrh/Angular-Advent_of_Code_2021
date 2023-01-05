import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D25SharedService {
  constructor() {}

  getParsedInput(
    rawInput: string
  ): {
    cardPublicKey: number;
    doorPublicKey: number;
  } {
    const sections = rawInput.split('\n');

    const cardPublicKey = parseInt(sections[0]);
    const doorPublicKey = parseInt(sections[1]);

    return { cardPublicKey, doorPublicKey };
  }
}
