import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D21SharedService } from './d21-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D21P02Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D21SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const alargenDict = this.sharedService.getAlergens(rawInput);
    const filteredAlergenList: { [s: string]: string[] } = {};

    const allAlargens = Object.keys(alargenDict);

    for (let alargen of allAlargens) {
      filteredAlergenList[alargen] = this.getPossibleFoods(
        alargenDict[alargen]
      );
    }

    const foundAlergens: { [s: string]: string } = {};
    const excludedFoods: string[] = [];
    while (true) {
      let breakMode = true;
      for (let alargen of allAlargens) {
        if (filteredAlergenList[alargen].length > 1) {
          breakMode = false;

          const newFoodList = [];
          for (let food of filteredAlergenList[alargen]) {
            if (!excludedFoods.includes(food)) {
              newFoodList.push(food);
            }
          }
          filteredAlergenList[alargen] = [...newFoodList];

          if (
            newFoodList.length == 1 &&
            !excludedFoods.includes(newFoodList[0])
          ) {
            excludedFoods.push(newFoodList[0]);
            foundAlergens[alargen] = newFoodList[0];
          }
        } else if (filteredAlergenList[alargen].length == 1) {
          if (
            filteredAlergenList[alargen].length == 1 &&
            !excludedFoods.includes(filteredAlergenList[alargen][0])
          ) {
            excludedFoods.push(filteredAlergenList[alargen][0]);
            foundAlergens[alargen] = filteredAlergenList[alargen][0];
          }
        }
      }

      if (breakMode) {
        break;
      }
    }

    let keys = Object.keys(foundAlergens);
    keys.sort()
    let result = '';
    for (let key of keys) {
      if (result.length > 0) {
        result += ',';
      }
      result += foundAlergens[key];
    }

    console.log(foundAlergens);

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
}
