import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D22SharedService } from './d22-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D22P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D22SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const input = this.sharedService.getParsedInput(rawInput);

    const player1 = input[0];
    const player2 = input[1];

    while (true) {
      if (!player1.hasCards() || !player2.hasCards()) {
        break;
      }

      const player1Card = player1.getTopCard();
      const player2Card = player2.getTopCard();

      if (player1Card > player2Card) {
        player1.addCard(player1Card);
        player1.addCard(player2Card);
      } else {
        player2.addCard(player2Card);
        player2.addCard(player1Card);
      }
    }

    const result = player1.getCardsScore() + player2.getCardsScore();

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }
}
