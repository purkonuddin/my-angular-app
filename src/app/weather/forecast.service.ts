import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, switchMap, pluck, mergeMap, filter, toArray, share, tap, catchError, retry } from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    }
  }[]
}

@Injectable({
  providedIn: 'root'
})

export class ForecastService {

  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient, private notificationsService: NotificationsService) {}

  getCurrentLocation(){
    return new Observable<Coordinates>((observer) => {
      console.log('get current locations...');

      window.navigator.geolocation.getCurrentPosition(
				(position)=>{
          // console.log(position);
					observer.next(position.coords);
					observer.complete();
				},
				(err) => observer.error(err)
			)
		}).pipe(
      retry(1),
      tap(()=>{
        console.log('addSuccess');
        this.notificationsService.addSuccess('Get your location!');
      }
      // , (err)=> {
      //   this.notificationsService.addError('Failed to get location!');
      // }
      ),
      catchError(err => {
        // console.log('addError:', err.message);

        this.notificationsService.addError(`${err.message}`);
        return throwError(err);
      })
    )
  }

  getForecast(){
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.latitude))
          .set('units', 'metric')
          .set('appid', 'f557b20727184231a597c710c8be3106')
        }),
        switchMap(params =>
          this.http.get<OpenWeatherResponse>(this.url, {params})
        ),
        pluck('list'),
        mergeMap(value => of(...value)),
        filter((value, index) => index % 8 === 0),
        /*
        map(response => {
          return response.list.map((record, index) => {
          return { dt_txt, temp}
          }).filter((record, index) => index % 8 === 0)
        })
        */
        map(value=>{
          return {
            dateString: value.dt_txt,
            temp: value.main.temp
          }
        }),
        toArray<{ dateString: string; temp: number;}>(),
        share()
      );
  }
}
