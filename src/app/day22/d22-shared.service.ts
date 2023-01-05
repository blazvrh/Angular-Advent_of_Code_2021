import { Injectable } from '@angular/core';

export class Player {
  constructor(public cards: number[]) {}

  hasCards(): boolean {
    return this.cards.length > 0;
  }

  getTopCard(): number {
    return this.cards.splice(0, 1)[0];
  }

  addCard(newCard: number): void {
    this.cards.push(newCard);
  }

  getCardCount(): number {
    return this.cards.length;
  }

  getCopyOfCards(numberOfWantedCards: number): number[] {
    return this.cards.slice(0, numberOfWantedCards);
  }

  getPlayersCardString(suffix: string): string {
    let cards = '';
    for (let i = 0; i < this.cards.length; i++) {
      cards += this.cards[i].toString() + ',';
    }

    return suffix + cards;
  }

  getCardsScore(): number {
    if (this.cards.length === 0) {
      return 0;
    }

    const resultCardArr = this.cards.reverse();
    let result = 0;

    for (let i = 0; i < resultCardArr.length; i++) {
      result += (i + 1) * resultCardArr[i];
    }

    return result;
  }
}

@Injectable({
  providedIn: 'root',
})
export class D22SharedService {
  constructor() {}

  getParsedInput(rawInput: string): Player[] {
    const sections = rawInput.split('\n\n');

    const player1Cards = this.getCards(sections[0]);
    const player2Cards = this.getCards(sections[1]);

    const player1 = new Player(player1Cards);
    const player2 = new Player(player2Cards);

    return [player1, player2];
  }

  private getCards(playerSection: string) {
    const playerCards = playerSection.split('\n');

    const cards: number[] = [];

    for (let i = 1; i < playerCards.length; i++) {
      cards.push(parseInt(playerCards[i]));
    }

    return cards;
  }
}
