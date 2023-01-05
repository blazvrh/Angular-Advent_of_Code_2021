import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D16SharedService, Ticket, TicketRule } from './d16-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D16P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D16SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const input = this.sharedService.getParsedInput(rawInput);

    const validTickets: Ticket[] = [input.myTicket];

    for (let ticket of input.otherTickets) {
      if (this.isValidTicket(ticket, input.ticketRules)) {
        validTickets.push(ticket);
      }
    }

    const allRuleNames = this.getAllRuleNames(input.ticketRules);
    const validRuleNames = {};

    for (let i = 0; i < input.myTicket.numbers.length; i++) {
      const invalidRuleNames: string[] = [];
      for (let ticket of validTickets) {
        invalidRuleNames.push(
          ...this.getInvalidRuleNames(ticket.numbers[i], input.ticketRules)
        );
      }

      const validNames = [];
      for (let ruleName of allRuleNames) {
        if (!invalidRuleNames.includes(ruleName)) {
          validNames.push(ruleName);
        }
      }

      validRuleNames[i] = validNames;
    }

    const takenNames = [];
    while (true) {
      let finished = true;

      const keys = Object.keys(validRuleNames);

      for (let key of keys) {
        if (
          validRuleNames[key].length === 1 &&
          !takenNames.includes(validRuleNames[key][0])
        ) {
          takenNames.push(validRuleNames[key][0]);
        } else if (validRuleNames[key].length !== 1) {
          for (let i = 0; i < validRuleNames[key].length; i++) {
            if (takenNames.includes(validRuleNames[key][i])) {
              validRuleNames[key].splice(i, 1);
            }
          }
        }

        if (validRuleNames[key].length !== 1) {
          finished = false;
        }
      }

      if (finished) {
        break;
      }
    }

    let result = 1;

    for (let key of Object.keys(validRuleNames)) {
      if (validRuleNames[key][0].substr(0, 9) === 'departure') {
        result *= input.myTicket.numbers[key];
      }
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }

  private isValidTicket(ticket: Ticket, rules: TicketRule[]): boolean {
    for (let number of ticket.numbers) {
      if (!this.isValidNumberAllRules(number, rules)) {
        return false;
      }
    }

    return true;
  }

  private getAllRuleNames(rules: TicketRule[]) {
    const allRuleNames: string[] = [];
    for (let rule of rules) {
      allRuleNames.push(rule.name);
    }

    return allRuleNames;
  }

  private getInvalidRuleNames(number: number, rules: TicketRule[]): string[] {
    const invalidRules = [];

    for (let rule of rules) {
      if (!this.isValidNumberSingle(number, rule)) {
        invalidRules.push(rule.name);
      }
    }

    return invalidRules;
  }

  private isValidNumberAllRules(number: number, rules: TicketRule[]): boolean {
    let isValid = false;

    for (let rule of rules) {
      if (this.isValidNumberSingle(number, rule)) {
        isValid = true;
        break;
      }
    }

    return isValid;
  }

  private isValidNumberSingle(number: number, rule: TicketRule): boolean {
    let isValid = false;

    for (let validSection of rule.validSections) {
      if (
        number >= validSection.startNumber &&
        number <= validSection.endNumber
      ) {
        isValid = true;
      }
    }

    return isValid;
  }
}
