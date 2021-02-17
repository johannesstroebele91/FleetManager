import {Component, OnInit} from '@angular/core';
import {DriversService} from '../../../services/drivers.service';
import {Driver} from '../../../models/driver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  drivers: Driver[];
  driversDisplayed: Driver[];
  searchTerm: string;

  constructor(private driversService: DriversService) {
  }

  ngOnInit(): void {

    // Get albums from iTunes API
    this.driversService.getDriversData().subscribe(data => {
      this.drivers = data;
      this.driversDisplayed = data;
    });
  }

  // Search for respective search term
  search() {
    if (!this.searchTerm || this.searchTerm === '') {
      this.driversDisplayed = this.drivers;
      return;
    }

    const searched = this.searchTerm?.toUpperCase();

    this.driversDisplayed = this.drivers?.filter(album => album['im:name'].label.toUpperCase().includes(searched));
  }
}
