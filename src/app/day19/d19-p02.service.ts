import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D19SharedService, Rules } from './d19-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D19P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D19SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const input = this.sharedService.getParsedInput(rawInput);

    const rule42 = this.getMessageDict(this.getRuleMessages('42', input.rules));
    const rule31 = this.getMessageDict(this.getRuleMessages('31', input.rules));

    console.log(rule31);
    console.log(rule42);

    let validMessageCount = 0;
    for (let message of input.messages) {
      if (this.isMessageValid(message, rule42, rule31)) {
        validMessageCount++;
      }
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: validMessageCount.toString(),
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

  isMessageValid(message: string, rule42, rule31): boolean {
    const sectionLength = Object.keys(rule42)[0].length;

    const splittedMessage = this.getSplittedMessage(message, sectionLength);

    const rule31Count = this.getRule31Count(splittedMessage, rule31);

    if (
      rule31Count === 0 ||
      rule31Count >= splittedMessage.length - rule31Count
    ) {
      return false;
    }

    const rule42Messages = splittedMessage.slice(
      0,
      splittedMessage.length - rule31Count
    );

    return this.isRule42Valid(rule42Messages, rule42);
  }

  getSplittedMessage(message: string, sectionLength: number): string[] {
    if (message.length % sectionLength !== 0) {
      return null;
    }

    const splittedMessage: string[] = [];

    for (let i = 0; i < message.length / sectionLength; i++) {
      const messageSection = message.substr(i * sectionLength, sectionLength);
      splittedMessage.push(messageSection);
    }

    return splittedMessage;
  }

  getRule31Count(splittedMessage: string[], rule31): number {
    let count = 0;
    for (let i = splittedMessage.length - 1; i > -1; i--) {
      const message = splittedMessage[i];
      if (rule31[message]) {
        count++;
      } else {
        break;
      }
    }

    return count;
  }

  isRule42Valid(splittedMessage: string[], rule42): boolean {
    for (let message of splittedMessage) {
      if (rule42[message] == null) {
        return false;
      }
    }
    return true;
  }
}
