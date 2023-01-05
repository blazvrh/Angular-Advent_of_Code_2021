import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { Cube, Cubes, D17SharedService } from './d17-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D17P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D17SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    let allCubes = this.sharedService.getParsedInput(rawInput);

    for (let i = 0;i< 6; i++) {
      allCubes = this.getNextActiveCubes(allCubes)
    }

    const result = Object.keys(allCubes).length

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }

  getNextActiveCubes(currentActiveCubes: Cubes): Cubes {
    const checkedCubes: { [s: string]: boolean } = {};
    const newActiveCubes: Cubes = {};

    for (let cube of Object.values(currentActiveCubes)) {
      checkedCubes[cube.name] = true;

      if (
        this.countOfActiveNeighbors(cube, currentActiveCubes) === 2 ||
        this.countOfActiveNeighbors(cube, currentActiveCubes) === 3
      ) {
        newActiveCubes[cube.name] = {
          active: true,
          name: cube.name,
          neighbors: cube.neighbors,
          x: cube.x,
          y: cube.y,
          z: cube.z,
        };
      }

      for (let neighbor of cube.neighbors) {
        if (checkedCubes[neighbor]) {
          continue;
        }

        checkedCubes[neighbor] = true;
        const neighborsCube = this.getCube(neighbor, currentActiveCubes);

        if (
          this.countOfActiveNeighbors(neighborsCube, currentActiveCubes) === 3
        ) {
          newActiveCubes[neighborsCube.name] = {
            active: true,
            name: neighborsCube.name,
            neighbors: neighborsCube.neighbors,
            x: neighborsCube.x,
            y: neighborsCube.y,
            z: neighborsCube.z,
          };
        }
      }
    }

    return newActiveCubes;
  }

  countOfActiveNeighbors(cube: Cube, allCubes: Cubes): number {
    let activeCount = 0;

    for (let neighbor of cube.neighbors) {
      if (allCubes[neighbor] && allCubes[neighbor].active) {
        activeCount++;
      }
    }
    return activeCount;
  }

  getCube(cubeName: string, allCubes: Cubes): Cube {
    if (allCubes[cubeName]) {
      return allCubes[cubeName];
    }

    const splitedPos = cubeName.split(',');

    return {
      active: false,
      name: cubeName,
      neighbors: this.sharedService.getCubeNeighbors(cubeName),
      x: parseInt(splitedPos[0]),
      y: parseInt(splitedPos[1]),
      z: parseInt(splitedPos[2]),
    };
  }
}
