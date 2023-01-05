import { Injectable } from '@angular/core';

interface ValidSection {
  startNumber: number;
  endNumber: number;
}

export interface TicketRule {
  name: string;
  validSections: ValidSection[];
}

export interface Ticket {
  id: number;
  numbers: number[];
}

@Injectable({
  providedIn: 'root',
})
export class D16SharedService {
  constructor() {}

  getParsedInput(
    rawInput: string
  ): {
    ticketRules: TicketRule[];
    myTicket: Ticket;
    otherTickets: Ticket[];
  } {
    const sections = rawInput.split('\n\n');

    const ticketRules: TicketRule[] = [];
    let lines = sections[0].split('\n');
    for (let line of lines) {
      ticketRules.push(this.parseRule(line));
    }

    const myNumbers = sections[1].split('\n')[1];
    const myTicket: Ticket = this.parseTicket(myNumbers, 0);

    let otherTickets: Ticket[] = [];
    const numberLines = sections[2].split('\n');
    for (let i = 1; i < numberLines.length; i++) {
      const line = numberLines[i];
      otherTickets.push(this.parseTicket(line, i));
    }

    return {
      ticketRules,
      myTicket,
      otherTickets,
    };
  }

  parseRule(rawString: string): TicketRule {
    const colonSplit = rawString.split(': ');
    const ruleName = colonSplit[0];

    const validSections: ValidSection[] = [];
    const vaildSectionsStr = colonSplit[1].split(' or ');

    for (let validSectionStr of vaildSectionsStr) {
      const splittedSection = validSectionStr.split('-');
      const startNumber = parseInt(splittedSection[0]);
      const endNumber = parseInt(splittedSection[1]);
      const validSection: ValidSection = { startNumber, endNumber };
      validSections.push(validSection);
    }

    return {
      name: ruleName,
      validSections: validSections,
    };
  }

  parseTicket(rawString: string, lineNumber: number): Ticket {
    const numbers: number[] = [];
    for (let number of rawString.split(',')) {
      numbers.push(parseInt(number));
    }

    return {
      id: lineNumber,
      numbers,
    };
  }

  getSumOfArray(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0);
  }
}
