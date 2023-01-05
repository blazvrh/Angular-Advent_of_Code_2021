import { Injectable } from '@angular/core';
import { TimerService } from '../shared/timer.service';
import { D18SharedService } from './d18-shared.service';

@Injectable({
  providedIn: 'root',
})
export class D18P01Service {
  constructor(
    private timerService: TimerService,
    private sharedService: D18SharedService
  ) {}

  getResult(rawInput: string): { result: string; calculationTime: number } {
    this.timerService.startTimer();

    const expressions = this.sharedService.getParsedInput(rawInput);

    const results: string[] = [];
    for (let expression of expressions) {
      results.push(this.getExpressionResult(expression));
    }

    let finalResult = 0;
    for (let result of results) {
      finalResult += parseInt(result);
    }

    const calculationTime = this.timerService.getTime();
    return {
      result: finalResult.toString(),
      calculationTime: calculationTime,
    };
  }

  getExpressionResult(expression: string): string {
    let newExpression: string = '';

    if (expression.includes('(')) {
      let nestLevel = 0;
      let startIdx = -1;
      let endIdx = 0;

      for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (char === '(') {
          nestLevel++;
          if (nestLevel === 1) {
            startIdx = i + 1;
          }
        } else if (char === ')') {
          nestLevel--;
          if (nestLevel === 0) {
            endIdx = i;
            const innerExpression = expression.substring(startIdx, endIdx);

            const solvedInnerExpression = this.getExpressionResult(
              innerExpression
            );

            newExpression = newExpression + solvedInnerExpression;
          }
        }

        if (nestLevel === 0 && char !== '(' && char !== ')') {
          newExpression += char;
        }
      }
    } else {
      newExpression = expression;
    }

    return this.calculateExpression(newExpression);
  }

  calculateExpression(expression: string): string {
    let prevNumberStr: string = '';

    const numbers: number[] = [];
    const operations: string[] = [];

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      if (char === '*' || char === '+') {
        numbers.push(parseInt(prevNumberStr));
        prevNumberStr = '';

        if (char === '+') {
          operations.push('sum');
        } else if (char === '*') {
          operations.push('mul');
        }
      } else {
        prevNumberStr += char;
      }

      if (i === expression.length - 1) {
        numbers.push(parseInt(prevNumberStr));
      }
    }

    let result: number = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
      const operation = operations[i - 1];
      const number = numbers[i];

      if (operation === 'sum') {
        result += number;
      } else if (operation === 'mul') {
        result *= number;
      }
    }

    return result.toString();
  }
}
