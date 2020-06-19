import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  // forecastData = [];
  forecast$: Observable<{dateString: string; temp: number;}[]>;

  constructor(forecastService: ForecastService){
    // forecastService.getForecast()
    // .subscribe(forecastData => {
    //   console.log( forecastData );
    //   this.forecastData = forecastData
    // });
    this.forecast$ = forecastService.getForecast();
  }

  ngOnInit(): void {
  }

}
