import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D20SharedService, Tile, Tiles } from './d20-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D20P02Service {
  monster = [
    'xxxxxxxxxxxxxxxxxx#x',
    '#xxxx##xxxx##xxxx###',
    'x#xx#xx#xx#xx#xx#xxx',
  ];

  constructor(
    private timerService: TimerService,
    private sharedService: D20SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const allTiles = this.sharedService.getParsedInput(rawInput);
    this.processTiles(allTiles);

    const fullImg = this.getFullImage(allTiles);

    let tempImg = fullImg;

    for (let i = 0; i < 4; i++) {
      tempImg = this.rotateImageLeft(tempImg);
      tempImg = this.findMonsters(tempImg);
    }
    tempImg = this.flipImageVertical(tempImg);
    for (let i = 0; i < 4; i++) {
      tempImg = this.rotateImageLeft(tempImg);
      tempImg = this.findMonsters(tempImg);
    }

    let result = 0;
    for (let row of tempImg) {
      for (let char of row) {
        if (char === '#') {
          result++;
        }
      }
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }

  processTiles(allTiles: Tiles) {
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

  getFullImage(allTiles: Tiles) {
    const topLeftCornerIdx = this.getUpperLeftCornerIdx(allTiles);

    const picture: string[] = [];

    let idx = topLeftCornerIdx;
    while (true) {
      const tile = allTiles[idx];
      const stripedTile = this.getStripedImg(tile);
      picture.push(...this.getRowImage(idx, allTiles));

      if (tile.neighbourIds[2] == null) {
        break;
      }

      idx = tile.neighbourIds[2];
    }

    return picture;
  }

  getUpperLeftCornerIdx(allTiles: Tiles): number {
    const keys = Object.keys(allTiles);

    for (let key of keys) {
      const tile = allTiles[key];
      if (tile.neighbourIds[0] == null && tile.neighbourIds[3] == null) {
        return parseInt(key);
      }
    }

    return null;
  }

  getRowImage(firstTileIdx: number, allTiles: Tiles): string[] {
    let idx = firstTileIdx;
    const img: string[] = [];

    let stripedTile = this.getStripedImg(allTiles[idx]);
    img.push(...stripedTile);

    idx = allTiles[idx].neighbourIds[1];
    while (true) {
      const tile = allTiles[idx];
      const stripedTile = this.getStripedImg(tile);

      for (let i = 0; i < img.length; i++) {
        img[i] += stripedTile[i];
      }

      if (tile.neighbourIds[1] == null) {
        break;
      }

      idx = tile.neighbourIds[1];
    }

    return img;
  }

  getStripedImg(tile: Tile): string[] {
    const img: string[] = [];

    for (let i = 1; i < tile.originalTile.length - 1; i++) {
      const row = tile.originalTile[i].substr(
        1,
        tile.originalTile[i].length - 2
      );
      img.push(row);
    }

    return img;
  }

  findMonsters(originalImg: string[]) {
    let img = [...originalImg];
    for (let y = 1; y < img.length - 1; y++) {
      for (let x = 0; x < img[0].length - 19; x++) {
        const firstRow = img[y - 1][x + 18];
        const secondRow = img[y].substr(x, 20);
        const thirdRow = img[y + 1].substr(x, 20);

        // console.log(x, x + 20);

        // console.log(firstRow, secondRow, thirdRow);

        let concatedStr =
          firstRow +
          secondRow[0] +
          secondRow[5] +
          secondRow[6] +
          secondRow[11] +
          secondRow[12] +
          secondRow[17] +
          secondRow[18] +
          secondRow[19] +
          thirdRow[1] +
          thirdRow[4] +
          thirdRow[7] +
          thirdRow[10] +
          thirdRow[13] +
          thirdRow[16];

        if (concatedStr.indexOf('.') > -1) {
          continue;
        }

        img[y - 1] = this.replaceAt(img[y - 1], x + 18, 'O');
        img[y] = this.replaceAt(img[y], x + 0, 'O');
        img[y] = this.replaceAt(img[y], x + 5, 'O');
        img[y] = this.replaceAt(img[y], x + 6, 'O');
        img[y] = this.replaceAt(img[y], x + 11, 'O');
        img[y] = this.replaceAt(img[y], x + 12, 'O');
        img[y] = this.replaceAt(img[y], x + 17, 'O');
        img[y] = this.replaceAt(img[y], x + 18, 'O');
        img[y] = this.replaceAt(img[y], x + 19, 'O');
        img[y + 1] = this.replaceAt(img[y + 1], x + 1, 'O');
        img[y + 1] = this.replaceAt(img[y + 1], x + 4, 'O');
        img[y + 1] = this.replaceAt(img[y + 1], x + 7, 'O');
        img[y + 1] = this.replaceAt(img[y + 1], x + 10, 'O');
        img[y + 1] = this.replaceAt(img[y + 1], x + 13, 'O');
        img[y + 1] = this.replaceAt(img[y + 1], x + 16, 'O');
      }
    }
    return img;
  }

  replaceAt(originalString: string, index: number, replacement: string) {
    return (
      originalString.substr(0, index) +
      replacement +
      originalString.substr(index + replacement.length)
    );
  }

  rotateImageLeft(img: string[]): string[] {
    let newTilePosition: string[] = [];

    for (let j = img.length - 1; j > -1; j--) {
      let row = '';
      for (let i = 0; i < img.length; i++) {
        row += img[i][j];
      }
      newTilePosition.push(row);
    }

    return newTilePosition;
  }

  flipImageVertical(img: string[]): string[] {
    let newTilePosition: string[] = [];

    for (let j = img.length - 1; j > -1; j--) {
      newTilePosition.push(img[j]);
    }

    return newTilePosition;
  }
}
