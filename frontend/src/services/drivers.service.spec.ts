import { TestBed } from '@angular/core/testing';

import { DriversService } from './drivers.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DriversService', () => {
  let service: DriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule]
    });
    service = TestBed.inject(DriversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
