import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D24SharedService } from './d24-shared.service';

interface Tile {
  x: number;
  y: number;
  flipCount?: number;
}

interface Positions {
  [s: string]: Tile;
}

@Injectable({
  providedIn: 'root',
})
export class D24P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D24SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const input = this.sharedService.getParsedInput(rawInput);

    const startPosition = this.getStartPosition(input);

    for (let i = 0; i < 100; i++) {
      this.switchTiles(startPosition);
    }

    let result = 0;
    for (let pos of Object.values(startPosition)) {
      if (pos.flipCount % 2 === 1) {
        result++;
      }
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }

  getStartPosition(input: { [n: number]: string[] }): Positions {
    const positions: Positions = {};

    for (let instructions of Object.values(input)) {
      const targetPos = this.getTargetTile(instructions);

      const strPosition = this.positionToString(targetPos);

      if (positions[strPosition] == null) {
        positions[strPosition] = {
          x: targetPos.x,
          y: targetPos.y,
          flipCount: 1,
        };
      } else {
        positions[strPosition].flipCount++;
      }
    }

    return positions;
  }

  getTargetTile(instructions: string[]): Tile {
    const position = {
      x: 0,
      y: 0,
    };

    for (let instruction of instructions) {
      switch (instruction) {
        case 'e':
          position.x += 2;
          break;
        case 'w':
          position.x -= 2;
          break;
        case 'se':
          position.x++;
          position.y--;
          break;
        case 'sw':
          position.x--;
          position.y--;
          break;
        case 'ne':
          position.x++;
          position.y++;
          break;
        case 'nw':
          position.x--;
          position.y++;
          break;

        default:
          console.error('Wuppss');

          break;
      }
    }

    return position;
  }

  positionToString(position: { x: number; y: number }): string {
    return position.x.toString() + ',' + position.y.toString();
  }

  switchTiles(startPosition: Positions) {
    const blackTiles = this.getBlackTiles(startPosition);
    const whiteTiles = this.getImportantWhiteTiles(blackTiles);

    const blackKeys = Object.keys(blackTiles);
    const whiteKeys = Object.keys(whiteTiles);

    for (let key of blackKeys) {
      const blackNeighbourCount = this.getNumberOfBlackNeighbours(
        blackTiles[key],
        blackKeys
      );

      if (blackNeighbourCount === 0 || blackNeighbourCount > 2) {
        startPosition[key] = blackTiles[key];
        startPosition[key].flipCount = 2;
      }
    }

    for (let key of whiteKeys) {
      const blackNeighbourCount = this.getNumberOfBlackNeighbours(
        whiteTiles[key],
        blackKeys
      );

      if (blackNeighbourCount === 2) {
        startPosition[key] = whiteTiles[key];
        startPosition[key].flipCount = 1;
      }
    }
  }

  getBlackTiles(currentPositions: Positions): Positions {
    const keys = Object.keys(currentPositions);

    const blackPositions: Positions = {};

    for (let key of keys) {
      const tile = currentPositions[key];
      if (tile.flipCount % 2 === 1) {
        blackPositions[key] = tile;
      }
    }

    return blackPositions;
  }

  getImportantWhiteTiles(blackPositions: Positions): Positions {
    const whiteTiles: Positions = {};

    const blackKeys = Object.keys(blackPositions);

    for (let blackKey of blackKeys) {
      const blackTile = blackPositions[blackKey];

      const neighbours = this.getNeighbours(blackTile);

      const neighbourKeys = Object.keys(neighbours);

      for (let key of neighbourKeys) {
        if (!blackKeys.includes(key)) {
          whiteTiles[key] = neighbours[key];
        }
      }
    }

    return whiteTiles;
  }

  getNeighbours(tile: Tile): Positions {
    const neighbourTiles: Positions = {};

    for (let x = tile.x - 1; x <= tile.x + 1; x++) {
      for (let y = tile.y - 1; y <= tile.y + 1; y++) {
        if (x === tile.x || y === tile.y) continue;

        const neighbourTile: Tile = { x, y };

        const neighbourTileStr = this.positionToString(neighbourTile);

        neighbourTiles[neighbourTileStr] = neighbourTile;
      }
    }

    let tempX = tile.x - 2;
    const tempY = tile.y;

    const neighbourTile1: Tile = { x: tempX, y: tempY };
    let neighbourTileStr = this.positionToString(neighbourTile1);
    neighbourTiles[neighbourTileStr] = neighbourTile1;

    tempX = tile.x + 2;

    const neighbourTile2: Tile = { x: tempX, y: tempY };
    neighbourTileStr = this.positionToString(neighbourTile2);
    neighbourTiles[neighbourTileStr] = neighbourTile2;

    return neighbourTiles;
  }

  getNumberOfBlackNeighbours(tile: Tile, blackKeys: string[]): number {
    const neighbours = this.getNeighbours(tile);

    let blackCount = 0;

    const keys = Object.keys(neighbours);
    for (let key of keys) {
      if (blackKeys.includes(key)) {
        blackCount++;
      }
    }

    return blackCount;
  }
}
