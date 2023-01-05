import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D06SharedService {
  constructor() {}

  getParsedInput(rawInput: string) {
    const splittedLines = rawInput.split('\n');

    let questions = {};
    const groupAnswers = [];
    let numOfPeople = 0;

    for (let i = 0; i < splittedLines.length; i++) {
      if (splittedLines[i] === '') {
        questions['numOfPeople'] = numOfPeople;
        numOfPeople = 0;
        groupAnswers.push(questions);
        questions = {};
        continue;
      }

      for (let j = 0; j < splittedLines[i].length; j++) {
        const char = splittedLines[i][j];

        if (questions[char] == null) {
          questions[char] = 1;
        } else {
          questions[char]++;
        }
      }
      numOfPeople++;
    }

    return groupAnswers;
  }
}
