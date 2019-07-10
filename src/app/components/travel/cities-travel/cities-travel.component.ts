import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { Travel } from '../../../classes/travel';

@Component({
  selector: 'app-cities-travel',
  templateUrl: './cities-travel.component.html',
  styleUrls: ['./cities-travel.component.scss'],
  providers: [ApiService]
})
export class CitiesTravelComponent implements OnInit {

  private cities: any;
  private travel: Travel = JSON.parse(localStorage.getItem("travel"));

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.apiService.postUrl('locationtravel/{travelId}', [String(this.travel.id)]).then(
      (resp) => this.cities = resp,
      (fail) => {
        if (fail.error) {
          Swal.fire({
            title: fail.error,
            type: 'info',
          })
        } else {
          Swal.fire({
            title: 'Error: ' + fail.status,
            text: fail.name + '. ' + fail.statusText,
            type: 'error',
          })
        }
      }
    );
  }

  deleteCity(cityId: number) {
    this.apiService.deleteUrl('locationtravel/', [String(cityId)]).then(
      (resp) => this.cities = resp,
      (fail) => {
        if (fail.error) {
          Swal.fire({
            title: fail.error,
            type: 'info',
          })
        } else {
          Swal.fire({
            title: 'Error: ' + fail.status,
            text: fail.name + '. ' + fail.statusText,
            type: 'error',
          })
        }
      }
    );
  }

  travelDetails(cityId: number) {
    this.router.navigate(['travel', this.travel.id, 'city', cityId]);
  }
}
