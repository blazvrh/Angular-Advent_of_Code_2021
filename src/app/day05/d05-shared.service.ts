import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D05SharedService {
  constructor() {}

  getParsedInput(rawInput: string) {
    const splittedInput = rawInput.split('\n');
    let parsedInput: {
      xPosStr: string;
      yPosStr: string;
      xPosNum: number;
      yPosNum: number;
    }[] = [];

    splittedInput.forEach((element) => {
      const yPosStr = element.substr(0, 7).replace(/F/g, '0').replace(/B/g, '1');
      const xPosStr = element.substr(7, 3).replace(/L/g, '0').replace(/R/g, '1');

      parsedInput.push({
        xPosStr: xPosStr,
        yPosStr: yPosStr,
        xPosNum: parseInt(xPosStr, 2),
        yPosNum: parseInt(yPosStr, 2),
      });
    });

    return parsedInput;
  }
}
