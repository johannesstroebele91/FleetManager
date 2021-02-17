import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Driver} from '../models/driver';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private http: HttpClient) {
  }

  getDriversData(): Observable<Driver[]> {
    return this.http.get<Driver>('/api/drivers/')
      .pipe(map((response: any) => response.json()));
  }
}
