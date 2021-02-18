import {Component, OnDestroy, OnInit} from '@angular/core';
import {DriversService} from '../../../services/drivers.service';
import {Driver} from '../../../models/driver';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject, timer} from 'rxjs';
import {catchError, filter, map, switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  selectedDriver: Driver;
  drivers: Driver[];
  driversDisplayed: Driver[];
  searchTerm: string;

  private onDestory$: Subject<any> = new Subject<any>();
  apiLoaded: Observable<boolean>;

  options: google.maps.MapOptions = {
    center: {lat: 0, lng: 0},
    clickableIcons: true,
    zoom: 1
  };

  constructor(private driversService: DriversService, httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAZiQaDaSAyS70ATMOxvTNBdCaMPHjm1MU', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {

    // Get drivers from backend every 5 seconds
    // For ensuring that if the component is destroyed that the request stop
    timer(0, 5000).pipe(filter(() => !this.selectedDriver),
      switchMap(() => this.driversService.getDriversData()), takeUntil(this.onDestory$)
    )
      .subscribe(data => {
        this.drivers = data;
        this.driversDisplayed = data;
      });
  }

  // Search for respective search term
  search(): void {
    if (!this.searchTerm || this.searchTerm === '') {
      this.driversDisplayed = this.drivers;
      return;
    }

    const searched = this.searchTerm?.toUpperCase();

    this.driversDisplayed = this.drivers?.filter(driver => driver.driverName.toUpperCase().includes(searched));
  }

  ngOnDestroy(): void {
    this.onDestory$.next();
    this.onDestory$.complete();
  }

  clickMarker(driver: Driver): void {

    // Check for null or undefined
    if (!driver || this.selectedDriver) {
      this.driversDisplayed = this.drivers;
      this.selectedDriver = null;
    } else {
      this.driversDisplayed = [driver];
      this.selectedDriver = driver;
    }
  }
}
