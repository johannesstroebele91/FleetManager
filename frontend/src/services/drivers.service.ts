import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Driver} from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private http: HttpClient) {
  }

  // Request data from the backend using an observable
  getDriversData(): Observable<Driver[]> {
    return this.http.get<Driver[]>('http://localhost:8080/drivers');
  }
}
