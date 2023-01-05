import { Injectable } from '@angular/core';

class Cups {
  currentCupNumber: number;

  constructor(private cupNumbers: number[]) {
    this.currentCupNumber = cupNumbers[0];
  }

  getResult(): string {
    const startIdx = this.cupNumbers.indexOf(1) + 1;

    const endSlice = this.cupNumbers.slice(startIdx);
    const startSlice = this.cupNumbers.slice(0, startIdx - 1);

    endSlice.push(...startSlice);
    const strArr = endSlice.map((x) => x.toString());

    return strArr.join('');
  }

  getResultPart2(): number {
    let targetIdx = this.cupNumbers.indexOf(1) + 1;
    if (targetIdx >= this.cupNumbers.length) {
      targetIdx -= this.cupNumbers.length;
    }

    const num1 = this.cupNumbers[targetIdx];

    targetIdx++;
    if (targetIdx >= this.cupNumbers.length) {
      targetIdx -= this.cupNumbers.length;
    }
    const num2 = this.cupNumbers[targetIdx];
    return num1 * num2;
  }

  mixCups() {
    const takenCups = this.get3Cups();

    this.insertCups(takenCups);

    this.moveToNextCup();
  }

  private moveToNextCup(): void {
    let currentIdx = this.cupNumbers.indexOf(this.currentCupNumber);
    currentIdx++;
    if (currentIdx >= this.cupNumbers.length) {
      currentIdx -= this.cupNumbers.length;
    }

    this.currentCupNumber = this.cupNumbers[currentIdx];
  }

  private get3Cups(): number[] {
    let takenCups: number[];
    let currentIdx = this.cupNumbers.indexOf(this.currentCupNumber) + 1;

    takenCups = this.cupNumbers.splice(currentIdx, 3);

    if (takenCups.length < 3) {
      const extraCups = this.cupNumbers.splice(0, 3 - takenCups.length);

      takenCups.push(...extraCups);
    }

    return takenCups;
  }

  private insertCups(cups: number[]): void {
    const destinationNumber = this.getDestinationCupNumber();
    const destinationIdx = this.cupNumbers.indexOf(destinationNumber) + 1;

    this.cupNumbers.splice(destinationIdx, 0, ...cups);
  }

  private getDestinationCupNumber(): number {
    for (let i = this.currentCupNumber - 1; i > -1; i--) {
      if (this.cupNumbers.includes(i)) {
        return i;
      }
    }

    for (let i = 9; i > -1; i--) {
      if (this.cupNumbers.includes(i)) {
        return i;
      }
    }

    console.error('ERRORRRRRR!!');
  }
}

class Cups2 {
  currentCupNumber: number;
  cups: { [i: number]: number } = {};
  maxCupNumber: number;

  constructor(cupNumbers: number[]) {
    this.currentCupNumber = cupNumbers[0];

    for (let i = 0; i < cupNumbers.length; i++) {
      const currCup = cupNumbers[i];
      const nextCup =
        i !== cupNumbers.length - 1 ? cupNumbers[i + 1] : cupNumbers[0];

      this.cups[currCup] = nextCup;
    }

    this.maxCupNumber = cupNumbers[cupNumbers.length - 1];
    this.currentCupNumber = cupNumbers[0];
  }

  getResult(): number {
    const num1 = this.cups[1];
    const num2 = this.cups[num1];

    return num1 * num2;
  }

  mixCups() {
    const takenCups: number[] = this.getTakenCups();

    const targetCup = this.getTargetCup(takenCups);
    const nextOfTargetCup = this.cups[targetCup];

    const firstElement = this.getNthElement(1);
    const thirdElement = this.getNthElement(3);

    this.cups[this.currentCupNumber] = this.getNthElement(4);
    this.cups[thirdElement] = nextOfTargetCup;
    this.cups[targetCup] = firstElement;
    this.moveToNextCup();
  }

  private getTakenCups(): number[] {
    const takenCups: number[] = [];

    let cupNum = this.cups[this.currentCupNumber];
    for (let i = 0; i < 3; i++) {
      takenCups.push(cupNum);
      cupNum = this.cups[cupNum];
    }

    return takenCups;
  }

  private getTargetCup(takenCups: number[]): number {
    let i = this.currentCupNumber;
    while (true) {
      i--;
      if (i < 1) i = this.maxCupNumber;

      if (takenCups.includes(i)) continue;

      return i;
    }
  }

  private getNthElement(nthIdx: number): number {
    let element = this.currentCupNumber;

    for (let i = 0; i < nthIdx; i++) {
      element = this.cups[element];
    }

    return element;
  }

  private moveToNextCup(): void {
    this.currentCupNumber = this.cups[this.currentCupNumber];
  }
}

@Injectable({
  providedIn: 'root',
})
export class D23SharedService {
  constructor() {}

  getParsedInput(rawInput: string): Cups {
    const chars = rawInput.split('');

    const numbers = chars.map((x) => parseInt(x));

    const cups = new Cups(numbers);
    return cups;
  }

  getParsedInputPart2(rawInput: string): Cups2 {
    const chars = rawInput.split('');

    const numbers = chars.map((x) => parseInt(x));
    for (let i = 10; i <= 1_000_000; i++) {
      numbers.push(i);
    }

    const cups = new Cups2(numbers);
    return cups;
  }
}
