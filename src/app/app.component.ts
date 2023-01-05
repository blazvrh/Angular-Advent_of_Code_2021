import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  days: string[] = [];


  ngOnInit() {
    for (let i = 1; i < 26; i++) {
      this.days.push(("0" + i).slice(-2))
    }
  }

}
