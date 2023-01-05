import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TimerService } from '../shared/timer.service';
import { D21SharedService } from './d21-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D21P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D21SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const alargenDict = this.sharedService.getAlergens(rawInput);
    const filteredAlergenList = {};

    const allAlargens = Object.keys(alargenDict);

    for (let alargen of allAlargens) {
      filteredAlergenList[alargen] = this.getPossibleFoods(
        alargenDict[alargen]
      );
    }

    const allFoods = this.sharedService.getWholeFoodList(rawInput);
    const result = this.getImposibleFoodCount(filteredAlergenList, allFoods);

    const calculationTime = this.timerService.getTime();
    return {
      result: result.toString(),
      calculationTime: calculationTime,
    };
  }

  getPossibleFoods(foods: string[][]): string[] {
    const imposibleFoods: string[] = this.getImpossibleFoods(foods);
    const allFoods: string[] = [];

    for (let i = 0; i < foods.length; i++) {
      for (let j = 0; j < foods[i].length; j++) {
        const food = foods[i][j];
        if (!allFoods.includes(food)) {
          allFoods.push(food);
        }
      }
    }

    const possibleFoods: string[] = [];
    for (let food of allFoods) {
      if (!imposibleFoods.includes(food) && !possibleFoods.includes(food)) {
        possibleFoods.push(food);
      }
    }

    return possibleFoods;
  }

  getImpossibleFoods(foods: string[][]): string[] {
    const imposibleFoods: string[] = [];
    const allFoods: string[] = [];

    for (let i = 0; i < foods.length; i++) {
      for (let j = 0; j < foods[i].length; j++) {
        const food = foods[i][j];
        if (!allFoods.includes(food)) {
          allFoods.push(food);
        }
      }
    }

    for (let food of allFoods) {
      for (let i = 0; i < foods.length; i++) {
        if (!foods[i].includes(food)) {
          imposibleFoods.push(food);
          break;
        }
      }
    }

    return imposibleFoods;
  }

  getImposibleFoodCount(alergenFoods, allFoodList): number {
    const allAlergens = Object.keys(alergenFoods);
    const allPossibleFoods: string[] = [];

    for (let alergen of allAlergens) {
      for (let food of alergenFoods[alergen]) {
        if (!allPossibleFoods.includes(food)) {
          allPossibleFoods.push(food);
        }
      }
    }

    const impossibleFoodList: string[] = [];
    for (let food of allFoodList) {
      if (!allPossibleFoods.includes(food)) {
        impossibleFoodList.push(food);
      }
    }

    return impossibleFoodList.length;
  }
}
