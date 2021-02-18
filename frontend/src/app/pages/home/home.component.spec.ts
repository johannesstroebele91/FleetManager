import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule, MatButtonModule, MatCardModule, MatInputModule, NoopAnimationsModule],
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Testing click event for selecting a driver on the map
  describe('clickMarker', () => {
    it('should reset click event for the selectedDriver to driverDisplayed', () => {
      component.drivers = [{
        driverName: 'Jaime Turner',
        driverCityOrigin: 'Moraland',
        driverLanguage: 'German',
        driverPhone: '957-384-1666x4702',
        driverInfo: 'Centralized solution-oriented adapter',
        licensePlate: 'G06 2JC',
        kmDriven: 5783284,
        goalState: 'Delayed',
        goalCompletionPercent: 78,
        location: [
          15.6220395,
          -69.596014
        ]
      },
      ];
      component.selectedDriver = {
        driverName: 'Jaime Turner',
        driverCityOrigin: 'Moraland',
        driverLanguage: 'Spanish',
        driverPhone: '957-384-1666x4702',
        driverInfo: 'Centralized solution-oriented adapter',
        licensePlate: 'G06 2JC',
        kmDriven: 312342,
        goalState: 'On time',
        goalCompletionPercent: 42,
        location: [
          15.6220395,
          -69.596014,
        ]
      };
      component.clickMarker(null);

      expect(component.selectedDriver).toBeNull();
      expect(component.driversDisplayed).toEqual(component.drivers);
    });
  });
});
