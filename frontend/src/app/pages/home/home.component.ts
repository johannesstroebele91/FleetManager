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

  // Drivers
  selectedDriver: Driver;
  drivers: Driver[];
  driversDisplayed: Driver[];
  searchTerm: string;

  // Used for cleanup of the timer when the home component is destroyed
  private onDestory$: Subject<any> = new Subject<any>();

  // Map
  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: {lat: 0, lng: 0},
    clickableIcons: true,
    zoom: 1
  };

  constructor(private driversService: DriversService, httpClient: HttpClient) {

    // Requests data from the Google Maps API
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAZiQaDaSAyS70ATMOxvTNBdCaMPHjm1MU', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {

    // Get drivers from the backend every 5 seconds
    timer(0, 5000).pipe(filter(() => !this.selectedDriver),
      switchMap(() => this.driversService.getDriversData()),
      takeUntil(this.onDestory$) // For ensuring that if the component is destroyed that the request stop
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

  // Cancels the observable when the component is destroyed
  ngOnDestroy(): void {
    this.onDestory$.next();
    this.onDestory$.complete();
  }

  // Handels click events for the markers of the map
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
