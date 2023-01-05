import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D22SharedService, Player } from './d22-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D22P02Service {
  round = 0;

  constructor(
    private timerService: TimerService,
    private sharedService: D22SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const input = this.sharedService.getParsedInput(rawInput);

    const player1 = input[0];
    const player2 = input[1];

    this.getGameWinner(player1, player2);

    console.log(input);

    const result = player1.getCardsScore() + player2.getCardsScore();

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }

  private getGameWinner(player1: Player, player2: Player): number {
    const playedRoundIdxs = {};

    while (player1.hasCards() && player2.hasCards()) {
      const thisRoundIdx =
        player1.getPlayersCardString('p1,') +
        player2.getPlayersCardString('p2,');

      if (playedRoundIdxs[thisRoundIdx]) {
        return 0;
      } else {
        playedRoundIdxs[thisRoundIdx] = true;
      }

      this.round++;

      this.getRoundWinner(player1, player2);
    }

    if (player1.hasCards()) {
      return 0;
    } else {
      return 1;
    }
  }

  private getRoundWinner(player1: Player, player2: Player) {
    const player1Card = player1.getTopCard();
    const player2Card = player2.getTopCard();

    let winner: number;
    if (
      player1.getCardCount() >= player1Card &&
      player2.getCardCount() >= player2Card
    ) {
      const newPlayer1Cards = player1.getCopyOfCards(player1Card);
      const newPlayer2Cards = player2.getCopyOfCards(player2Card);
      const newPlayer1 = new Player(newPlayer1Cards);
      const newPlayer2 = new Player(newPlayer2Cards);
      winner = this.getGameWinner(newPlayer1, newPlayer2);
    } else {
      winner = player1Card > player2Card ? 0 : 1;
    }

    if (winner === 0) {
      player1.addCard(player1Card);
      player1.addCard(player2Card);
    } else {
      player2.addCard(player2Card);
      player2.addCard(player1Card);
    }
  }
}
