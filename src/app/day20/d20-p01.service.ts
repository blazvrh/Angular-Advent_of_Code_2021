import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D20SharedService, Tiles } from './d20-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D20P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D20SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const allTiles = this.sharedService.getParsedInput(rawInput);

    const tileIds = Object.keys(allTiles);

    let nextIds: number[] = [parseInt(tileIds[0])];

    while (true) {
      const newIds = [];
      for (let id of nextIds) {
        newIds.push(...this.setNeighbours(id, allTiles));
      }
      if (newIds.length === 0) {
        break;
      }
      nextIds = newIds;
    }

    const cornerIds: number[] = [];
    for (let tileId of tileIds) {
      const tile = allTiles[parseInt(tileId)];

      let nullCount = 0;
      for (let i = 0; i < 4; i++) {
        if (tile.neighbourIds[i] == null) {
          nullCount++;
        }
      }

      if (nullCount === 2) {
        cornerIds.push(parseInt(tileId));
      }
    }

    let result = 1;
    for (let cornerId of cornerIds) {
      result *= cornerId;
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }

  setNeighbours(tileId: number, allTiles: Tiles) {
    const nextTileIds: number[] = [];
    const startTile = allTiles[tileId];

    const tileIds = Object.keys(allTiles);

    for (let i = 0; i < 4; i++) {
      if (startTile.neighbourIds[i] != null) {
        continue;
      }

      for (let targetTileIdStr of tileIds) {
        let targetTileId = parseInt(targetTileIdStr);
        if (targetTileId === tileId) {
          continue;
        }
        const targetTile = allTiles[targetTileId];
        for (let j = 0; j < 4; j++) {
          if (startTile.borders[i] === targetTile.reverseBorders[j]) {
            startTile.neighbourIds[i] = targetTile.id;

            targetTile.rotateTile(j, i, false);

            nextTileIds.push(targetTile.id);
            break;
          } else if (startTile.borders[i] === targetTile.borders[j]) {
            startTile.neighbourIds[i] = targetTile.id;

            targetTile.rotateTile(j, i, true);

            nextTileIds.push(targetTile.id);
            break;
          }
        }
      }
    }
    return nextTileIds;
  }
}
