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
  public formGroup: FormGroup;
  cityForm: FormGroup;
  countries: Array<object>
  cities: Array<any>
  selectedCities: any = [];

  constructor(private modalService: NgbModal, private apiService: ApiService) {
  }

  open(content) {
    this.activeModal = this.modalService.open(content);
    this.selectedCities = [];
    this.getCountries();
    /*this.travelForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      userId: new FormControl('5', Validators.required),
      dateIni: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required)
    });*/
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
      (resp) => { this.cities = resp; console.log(this.cities) },
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
    console.log(id);
    const city = this.cities.find(x => x.id == id);
    const name = city.city
    this.selectedCities.push(
      {
        id,
        name
      }
    )
    console.log(this.selectedCities)
  }

  popCity(cityName: string) {
    this.selectedCities.splice(this.selectedCities.indexOf(cityName), 1);
  }

  addCities() {
    console.log(this.selectedCities)
    /*this.apiService.postUrl('travels', this.travelForm.value).then(
      (resp) => {
        this.closeModal();
        Swal.fire({
          title: '!Éxito¡',
          text: 'El viaje se creo satisfactoriamente.',
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
    );*/
  }
}