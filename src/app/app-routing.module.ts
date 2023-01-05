import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Day01Component } from './day01/day01.component';
import { Day02Component } from './day02/day02.component';
import { Day03Component } from './day03/day03.component';
import { Day04Component } from './day04/day04.component';
import { Day05Component } from './day05/day05.component';
import { Day06Component } from './day06/day06.component';
import { Day07Component } from './day07/day07.component';
import { Day08Component } from './day08/day08.component';
import { Day09Component } from './day09/day09.component';
import { Day10Component } from './day10/day10.component';
import { Day11Component } from './day11/day11.component';
import { Day12Component } from './day12/day12.component';
import { Day13Component } from './day13/day13.component';
import { Day14Component } from './day14/day14.component';
import { Day15Component } from './day15/day15.component';
import { Day16Component } from './day16/day16.component';
import { Day17Component } from './day17/day17.component';
import { Day18Component } from './day18/day18.component';
import { Day19Component } from './day19/day19.component';
import { Day20Component } from './day20/day20.component';
import { Day21Component } from './day21/day21.component';
import { Day22Component } from './day22/day22.component';
import { Day23Component } from './day23/day23.component';
import { Day24Component } from './day24/day24.component';
import { Day25Component } from './day25/day25.component';

const routes: Routes = [
  {path:"days/01", component: Day01Component},
  {path:"days/02", component: Day02Component},
  {path:"days/03", component: Day03Component},
  {path:"days/04", component: Day04Component},
  {path:"days/05", component: Day05Component},
  {path:"days/06", component: Day06Component},
  {path:"days/07", component: Day07Component},
  {path:"days/08", component: Day08Component},
  {path:"days/09", component: Day09Component},
  {path:"days/10", component: Day10Component},
  {path:"days/11", component: Day11Component},
  {path:"days/12", component: Day12Component},
  {path:"days/13", component: Day13Component},
  {path:"days/14", component: Day14Component},
  {path:"days/15", component: Day15Component},
  {path:"days/16", component: Day16Component},
  {path:"days/17", component: Day17Component},
  {path:"days/18", component: Day18Component},
  {path:"days/19", component: Day19Component},
  {path:"days/20", component: Day20Component},
  {path:"days/21", component: Day21Component},
  {path:"days/22", component: Day22Component},
  {path:"days/23", component: Day23Component},
  {path:"days/24", component: Day24Component},
  {path:"days/25", component: Day25Component},
  {path:"**", redirectTo:"/"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
