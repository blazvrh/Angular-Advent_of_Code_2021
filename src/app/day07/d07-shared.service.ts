import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D07SharedService {
  constructor() {}

  getParsedInput(rawInput: string) {
    const splittedLines = rawInput.split('\n');

    const bags = {};

    splittedLines.forEach((line) => {
      const firstSplit = line.split(' contain ');
      const outterBagColor = firstSplit[0].replace(' bags', '');
      const innerBagsSplited = firstSplit[1].replace('.', '').split(', ');

      let innerBags = {};
      if (firstSplit[1] === 'no other bags.') {
        innerBags = null;
      } else {
        innerBagsSplited.forEach((innerBag) => {
          const bag = innerBag.replace(' bags', '').replace(' bag', '');
          const bagNumber = bag.split(' ')[0];
          const bagColor = bag.substring(bagNumber.length + 1);
          innerBags[bagColor] = parseInt(bagNumber);
        });
      }

      bags[outterBagColor] = innerBags;
    });

    return bags;
  }
}
