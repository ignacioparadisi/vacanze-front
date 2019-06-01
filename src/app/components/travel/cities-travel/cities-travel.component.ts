import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cities-travel',
  templateUrl: './cities-travel.component.html',
  styleUrls: ['./cities-travel.component.scss']
})
export class CitiesTravelComponent implements OnInit {

  private cities: Array<object>;
  private travel = JSON.parse(localStorage.getItem("travel"));

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.cities = [
      {
        "id": 123,
        "country": "Australia",
        "city": "Kingoonya"
      },
      {
        "id": 342,
        "country": "Canada",
        "city": "Selkirk"
      },
      {
        "id": 73,
        "country": "Venezuela",
        "city": "Chaguaramas"
      },
    ]
  }

  deleteCity(cityId: number) {
    console.log(cityId)
  }

  travelDetails(cityId: number) {
    this.router.navigate(['travel', this.travel.id, 'city', cityId]);
  }
}
