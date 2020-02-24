import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-day-off',
  templateUrl: './day-off.component.html',
  styleUrls: ['./day-off.component.scss']
})
export class DayOffComponent implements OnInit {

    constructor(private app: AppComponent) {
        app.dateValue = new Date();
    }

   ngOnInit() {

    }

}
