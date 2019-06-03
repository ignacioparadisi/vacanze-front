import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cities-travel',
  templateUrl: './cities-travel.component.html',
  styleUrls: ['./cities-travel.component.scss'],
  providers: [ApiService]
})
export class CitiesTravelComponent implements OnInit {

  private cities: any;
  private travel = JSON.parse(localStorage.getItem("travel"));

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.apiService.getUrl('travels/{travelId}/locations', [String(this.travel.id)]).then(
      (resp) => this.cities = resp,
      (fail) => {
        Swal.fire({
          title: 'Error: ' + fail.status,
          text: fail.name + '. ' + fail.statusText,
          type: 'error',
        })
      }
    );
  }

  deleteCity(cityId: number) {
    console.log(cityId)
  }

  travelDetails(cityId: number) {
    this.router.navigate(['travel', this.travel.id, 'city', cityId]);
  }
}
