import { Injectable } from '@angular/core';

interface Borders {
  0: string;
  1: string;
  2: string;
  3: string;
}

export class Tile {
  borders: Borders;
  reverseBorders: Borders;
  correctOrientation = false;

  neighbourIds = {
    0: null,
    1: null,
    2: null,
    3: null,
  };

  constructor(public id: number, public originalTile: string[]) {
    this.constructBorders();
  }

  rotateTile(borderId: number, matchingBorderId: number, flip: boolean) {
    let rotationIdx = borderId - matchingBorderId;
    if (rotationIdx < 0) {
      rotationIdx += 4;
    }

    const odd = matchingBorderId % 2 != 0;
    // console.log(borderId, matchingBorderId, '--', rotationIdx, flip, this.id);

    if (flip) {
      switch (rotationIdx) {
        case 0:
          if (odd) {
            this.flipTileHorizontal();
          } else {
            this.flipTileVertical();
          }
          break;
        case 1:
          this.rotateTileRight();
          // this.flipTileVertical();
          if (odd) {
            this.flipTileVertical();
          } else {
            this.flipTileHorizontal();
          }
          break;
        case 2:
          if (odd) {
            this.flipTileVertical();
          } else {
            this.flipTileHorizontal();
          }
          // this.flipTileVertical();
          break;
        case 3:
          this.rotateTileLeft();
          // this.flipTileVertical();
          if (odd) {
            this.flipTileVertical();
          } else {
            this.flipTileHorizontal();
          }
          break;
      }
    } else {
      switch (rotationIdx) {
        case 1:
          this.rotateTileLeft();
          break;
        case 2:
          this.rotateTile180();
          break;
        case 3:
          this.rotateTileRight();
          break;
      }
    }
    this.constructBorders();
  }

  private rotateTileLeft() {
    let newTilePosition: string[] = [];

    for (let j = this.originalTile.length - 1; j > -1; j--) {
      let row = '';
      for (let i = 0; i < this.originalTile.length; i++) {
        row += this.originalTile[i][j];
      }
      newTilePosition.push(row);
    }

    this.originalTile = newTilePosition;
  }

  private rotateTileRight() {
    let newTilePosition: string[] = [];

    for (let i = 0; i < this.originalTile.length; i++) {
      let row = '';
      for (let j = this.originalTile.length - 1; j > -1; j--) {
        row += this.originalTile[j][i];
      }
      newTilePosition.push(row);
    }

    this.originalTile = newTilePosition;
  }

  private rotateTile180() {
    let newTilePosition: string[] = [];

    for (let j = this.originalTile.length - 1; j > -1; j--) {
      let row = this.reverseString(this.originalTile[j]);
      newTilePosition.push(row);
    }

    this.originalTile = newTilePosition;
  }

  private flipTileVertical() {
    let newTilePosition: string[] = [];

    for (let j = this.originalTile.length - 1; j > -1; j--) {
      newTilePosition.push(this.originalTile[j]);
    }

    this.originalTile = newTilePosition;
  }

  private flipTileHorizontal() {
    let newTilePosition: string[] = [];

    for (let i = 0; i < this.originalTile.length; i++) {
      newTilePosition.push(this.reverseString(this.originalTile[i]));
    }

    this.originalTile = newTilePosition;
  }

  private constructBorders() {
    const topBorder = this.originalTile[0];
    const botBorder = this.originalTile[this.originalTile.length - 1];
    let leftBorder: string = '';
    let rightBorder: string = '';

    for (let row of this.originalTile) {
      leftBorder += row[0];
      rightBorder += row[row.length - 1];
    }

    this.borders = {
      0: topBorder,
      1: rightBorder,
      2: this.reverseString(botBorder),
      3: this.reverseString(leftBorder),
    };

    this.reverseBorders = {
      2: this.reverseString(this.borders[0]),
      3: this.reverseString(this.borders[1]),
      0: this.reverseString(this.borders[2]),
      1: this.reverseString(this.borders[3]),
    };
  }

  private reverseString(str: string): string {
    return str.split('').reverse().join('');
  }
}
export interface Tiles {
  [s: string]: Tile;
}

@Injectable({
  providedIn: 'root',
})
export class D20SharedService {
  constructor() {}

  getParsedInput(rawInput: string): Tiles {
    const sections = rawInput.split('\n\n');

    const tiles: Tiles = {};

    for (let section of sections) {
      const lines = section.split('\n');
      const idRowSplitted = lines[0].split(' ');
      const id = idRowSplitted[1].substr(0, idRowSplitted[1].length - 1);

      const tile: string[] = [];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i];
        tile.push(row);
      }

      tiles[id] = new Tile(parseInt(id), [...tile]);
    }

    return tiles;
  }
}
