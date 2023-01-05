import { Injectable } from '@angular/core';

export interface Rules {
  [s: string]: [string[]];
}

@Injectable({
  providedIn: 'root',
})
export class D19SharedService {
  constructor() {}

  getParsedInput(rawInput: string): { messages: string[]; rules: Rules } {
    const sections = rawInput.split('\n\n');

    const messages = sections[1].split('\n');

    const rules = {};

    for (let line of sections[0].split('\n')) {
      const splittedLine = line.split(': ');
      const key = splittedLine[0];

      const ruleArr = splittedLine[1].split(' | ');
      let parsedRule = [];

      for (let rule of ruleArr) {
        const singleRule = rule.split(' ');
        parsedRule.push(singleRule);
      }
      rules[key] = parsedRule;
    }

    return {
      messages: messages,
      rules: rules,
    };
  }
}
