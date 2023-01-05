import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D16SharedService, Ticket, TicketRule } from './d16-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D16P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D16SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const input = this.sharedService.getParsedInput(rawInput);

    const invalidNumbers: number[] = [];

    for (let ticket of input.otherTickets) {
      invalidNumbers.push(
        ...this.getInvalidTicketNumbers(ticket, input.ticketRules)
      );
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: this.sharedService.getSumOfArray(invalidNumbers).toString(),
      calculationTime: calculationTime,
    };
  }

  getInvalidTicketNumbers(ticket: Ticket, rules: TicketRule[]) {
    const invalidNumbers: number[] = [];
    for (let number of ticket.numbers) {
      if (!this.isValidNumber(number, rules)) {
        invalidNumbers.push(number);
      }
    }

    return invalidNumbers;
  }

  isValidNumber(number: number, rules: TicketRule[]): boolean {
    let isValid = false;

    for (let rule of rules) {
      for (let validSection of rule.validSections) {
        if (
          number >= validSection.startNumber &&
          number <= validSection.endNumber
        ) {
          isValid = true;
        }
      }
    }

    return isValid;
  }
}
