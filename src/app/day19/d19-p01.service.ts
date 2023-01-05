import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D19SharedService, Rules } from './d19-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D19P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D19SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    // const input = this.sharedService.getParsedInput(rawInput);

    // const validMessages = this.getRuleMessages('0', input.rules);
    // const validMessagesDict = this.getMessageDict(validMessages);

    // let validMessageCount = 0;
    // for (let message of input.messages) {
    //   if (validMessagesDict[message]) {
    //     validMessageCount++;
    //   }
    // }

    const calculationTime = this.timerService.getTime();
    return {
      result: "validMessageCount".toString(),
      calculationTime: calculationTime,
    };
  }

  getRuleMessages(ruleKey: string, rules: Rules): string[] {
    let allMessages: string[] = [];

    for (let ruleSet of rules[ruleKey]) {
      let currRules: string[] = [];
      for (let rule of ruleSet) {
        if (rule === '"a"' || rule === '"b"') {
          return [rule.replace(/"/g, '')];
        } else {
          const newRules: string[] = [];
          if (currRules.length === 0) {
            currRules = this.getRuleMessages(rule, rules);
          } else {
            for (let appendex of this.getRuleMessages(rule, rules)) {
              for (let currRule of currRules) {
                newRules.push(currRule + appendex);
              }
            }
            currRules = newRules;
          }
        }
      }
      allMessages = allMessages.concat(currRules);
    }

    return allMessages;
  }

  getMessageDict(messages: string[]): { [s: string]: boolean } {
    const dict: { [s: string]: boolean } = {};

    for (let message of messages) {
      dict[message] = true;
    }
    return dict;
  }
}
