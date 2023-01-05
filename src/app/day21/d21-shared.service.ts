import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D21SharedService {
  constructor() {}

  getAlergens(rawInput: string): { [s: string]: string[][] } {
    const lines = rawInput.split('\n');

    const allAlergens: { [s: string]: string[][] } = {};

    for (let line of lines) {
      const sections = line.split(' (contains ');
      const foods = sections[0].split(' ');
      const alergens = sections[1].replace(')', '').split(', ');

      for (let alergen of alergens) {
        if (allAlergens[alergen] == null) {
          allAlergens[alergen] = [];
        }
        allAlergens[alergen].push(foods);
      }
    }

    return allAlergens;
  }

  getWholeFoodList(rawInput: string): string[] {
    const lines = rawInput.split('\n');

    const foodList: string[] = [];

    for (let line of lines) {
      const sections = line.split(' (contains ');
      const foods = sections[0].split(' ');

      for (let food of foods) {
        foodList.push(food);
      }
    }

    return foodList;
  }
}
