import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbDate, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-city',
  templateUrl: './add-city.html',
  styleUrls: ['./add-city.scss'],
  providers: [NgbModal, ApiService]
})

export class AddCityComponent {

  @Output() spread = new EventEmitter();
  activeModal: NgbModalRef;
  private travel = JSON.parse(localStorage.getItem("travel"));
  countries: Array<object>
  cities: Array<any>
  travelCities: Array<any>
  selectedCities: Array<any> = [];
  hasSelectedCities: boolean = false

  constructor(private modalService: NgbModal, private apiService: ApiService) {
  }

  open(content) {
    this.activeModal = this.modalService.open(content);
    this.selectedCities = [];
    this.getCountries();
    this.getTravelCities();
  }

  closeModal() {
    this.activeModal.close();
  }

  getCountries() {
    this.apiService.getUrl('locations/countries/').then(
      (resp) => this.countries = resp,
      (fail) => {
        Swal.fire({
          title: 'Error: ' + fail.status,
          text: fail.name + '. ' + fail.statusText,
          type: 'error',
        })
      }
    );
  }

  getCities(countryId: number) {
    this.apiService.getUrl('locations/countries/{countryId}/cities', [countryId.toString()]).then(
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

  getTravelCities() {
    this.apiService.getUrl('travels/{travelId}/locations', [String(this.travel.id)]).then(
      (resp) => this.travelCities = resp,
      (fail) => {
        Swal.fire({
          title: 'Error: ' + fail.status,
          text: fail.name + '. ' + fail.statusText,
          type: 'error',
        })
      }
    );
  }

  addCity(id: number) {
    const newCity = this.cities.find(x => x.id == id);
    const city = newCity.city
    const country = newCity.country
    if (!(this.travelCities.find(x => x.id == id))) {
      this.selectedCities.push(
        {
          id,
          city,
          country
        }
      )
      this.hasSelectedCities = true;
    } else {
      Swal.fire({
        title: '¡Error!',
        html: 'La ciudad <strong>' + city + '</strong> del país <strong>' + country + '</strong> ya existe en el viaje',
        type: 'error',
      })
    }
  }

  popCity(cityName: string) {
    this.selectedCities.splice(this.selectedCities.indexOf(cityName), 1);
    if (this.selectedCities.length == 0) this.hasSelectedCities = false;
  }

  addCities() {
    this.apiService.postUrl('travels/{travelId}/locations', this.selectedCities, [String(this.travel.id)]).then(
      (resp) => {
        this.closeModal();
        Swal.fire({
          title: '!Éxito¡',
          text: 'Las ciudades se añadieron satisfactoriamente.',
          type: 'success'
        });
        this.spread.emit();
      },
      (fail) => {
        Swal.fire({
          title: 'Error: ' + fail.status,
          text: fail.name + '. ' + fail.statusText,
          type: 'error',
        })
      }
    );
  }
}