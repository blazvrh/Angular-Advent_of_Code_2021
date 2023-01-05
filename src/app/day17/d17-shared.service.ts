import { Injectable } from '@angular/core';

export interface Cubes {
  [s: string]: Cube;
}

export interface Cube {
  active: boolean;
  name: string;
  neighbors: string[];
  x: number;
  y: number;
  z: number;
  w?: number;
}

@Injectable({
  providedIn: 'root',
})
export class D17SharedService {
  constructor() {}

  getParsedInput(rawInput: string): Cubes {
    const lines = rawInput.split('\n');

    const activeCubes = {};

    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        const char = lines[y][x];

        if (char === '#') {
          const cubeName = x.toString() + ',' + y.toString() + ',0';
          const cube: Cube = {
            x,
            y,
            z: 0,
            name: cubeName,
            neighbors: this.getCubeNeighbors(cubeName),
            // neighbors: null,
            active: true,
          };
          activeCubes[cubeName] = cube;
        }
      }
    }

    return activeCubes;
  }

  getCubeNeighbors(cubeName: string): string[] {
    const splitedPos = cubeName.split(',');
    const x = parseInt(splitedPos[0]);
    const y = parseInt(splitedPos[1]);
    const z = parseInt(splitedPos[2]);

    const neighbors: string[] = [];

    for (let newX = x - 1; newX < x + 2; newX++) {
      for (let newY = y - 1; newY < y + 2; newY++) {
        for (let newZ = z - 1; newZ < z + 2; newZ++) {
          if (newX === x && newY === y && newZ === z) {
            continue;
          }

          const newName =
            newX.toString() + ',' + newY.toString() + ',' + newZ.toString();
          neighbors.push(newName);
        }
      }
    }

    return neighbors;
  }

  getParsedInputPart2(rawInput: string): Cubes {
    const lines = rawInput.split('\n');

    const activeCubes = {};

    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        const char = lines[y][x];

        if (char === '#') {
          const cubeName = x.toString() + ',' + y.toString() + ',0,0';
          const cube: Cube = {
            x,
            y,
            z: 0,
            name: cubeName,
            neighbors: this.getCubeNeighbors4D(cubeName),
            active: true,
          };
          activeCubes[cubeName] = cube;
        }
      }
    }

    return activeCubes;
  }

  getCubeNeighbors4D(cubeName: string): string[] {
    const splitedPos = cubeName.split(',');
    const x = parseInt(splitedPos[0]);
    const y = parseInt(splitedPos[1]);
    const z = parseInt(splitedPos[2]);
    const w = parseInt(splitedPos[3]);

    const neighbors: string[] = [];

    for (let newX = x - 1; newX < x + 2; newX++) {
      for (let newY = y - 1; newY < y + 2; newY++) {
        for (let newZ = z - 1; newZ < z + 2; newZ++) {
          for (let newW = w - 1; newW < w + 2; newW++) {
            if (newX === x && newY === y && newZ === z && newW === w) {
              continue;
            }

            const newName =
              newX.toString() +
              ',' +
              newY.toString() +
              ',' +
              newZ.toString() +
              ',' +
              newW.toString();
            neighbors.push(newName);
          }
        }
      }
    }

    return neighbors;
  }
}
