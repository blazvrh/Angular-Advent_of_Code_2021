import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class D22InputService {
  inputStr = `Player 1:
41
48
12
6
1
25
47
43
4
35
10
13
23
39
22
28
44
42
32
31
24
50
34
29
14

Player 2:
36
49
11
16
20
17
26
30
18
5
2
38
7
27
21
9
19
15
8
45
37
40
33
46
3`;

  testInput = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

  testInputLoop = `Player 1:
43
19

Player 2:
2
29
14`;

  constructor() {}

  getRawInput(): string {
    return this.inputStr;
    // return this.testInput;
    return this.testInputLoop;
  }
}
