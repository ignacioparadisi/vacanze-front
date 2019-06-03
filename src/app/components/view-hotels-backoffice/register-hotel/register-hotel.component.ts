import { ApiService } from '../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../../classes/role';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule
} from '@angular/forms';
import { environment as url } from '../../../../environments/environment';
import { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { transformImageToBase64 } from '../../../utils/global_functions';

@Component({
  selector: 'app-register-hotel',
  templateUrl: './register-hotel.component.html',
  styleUrls: ['./register-hotel.component.scss'],
  providers: [ApiService]
})
export class RegisterHotelComponent implements OnInit {
  public transformImageToBase64;
  public urlImage: string;
  public countries: any[];
  public cities: any[];

  public registrationForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    amountOfRooms: new FormControl(null, [
      Validators.required,
      Validators.min(1)
    ]),
    roomCapacity: new FormControl(null, [
      Validators.required,
      Validators.min(1)
    ]),
    addressSpecification: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50)
    ]),
    pricePerRoom: new FormControl(null, [
      Validators.pattern('^[0-9]+(.[0-9]{0,5})?$'),
      Validators.required,
      Validators.min(1)
    ]),
    phone: new FormControl(null, [
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s./0-9]*$')
    ]),
    website: new FormControl(null, [
      Validators.pattern(
        '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})'
      )
    ]),
    stars: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(5)
    ]),
    image: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required])
  });

  constructor(private _location: Location, private service: ApiService) {
    this.transformImageToBase64 = transformImageToBase64;
    this.urlImage = null;
    this.countries = [];
    this.getCountry();
  }

  public getCountry() {
    this.service.getUrl(url.endpoint.default._get.getCountry).then(
      response => {
      },
      error => console.error(error)
    );
  }

  public getCity(id: number) {
    this.service
      .getUrl(url.endpoint.default._get.getCity, [id.toString()])
      .then(
        response => {
          this.cities = response;
        },
        error => console.error(error)
      );
  }

  public selectCountry(event) {
    this.getCity(event.target.value);
  }

  ngOnInit() {}

  get name() {
    return this.registrationForm.get('name');
  }

  get amountOfRooms() {
    return this.registrationForm.get('amountOfRooms');
  }

  get roomCapacity() {
    return this.registrationForm.get('roomCapacity');
  }

  get addressSpecification() {
    return this.registrationForm.get('addressSpecification');
  }

  get pricePerRoom() {
    return this.registrationForm.get('pricePerRoom');
  }

  get phone() {
    return this.registrationForm.get('phone');
  }

  get website() {
    return this.registrationForm.get('website');
  }

  get stars() {
    return this.registrationForm.get('stars');
  }

  public getImage(event) {
    this.transformImageToBase64(event, image => {
      this.urlImage = image;
    });
  }

  public goToViewHotels() {
    this._location.back();
  }

  public onSubmit() {
    this.service
      .postUrl(url.endpoint.default._post.postHotel, {
        name: this.registrationForm.get('name').value,
        amountOfRooms: this.registrationForm.get('amountOfRooms').value,
        roomCapacity: this.registrationForm.get('roomCapacity').value,
        isActive: true,
        addressSpecification: this.registrationForm.get('addressSpecification')
          .value,
        pricePerRoom: this.registrationForm.get('pricePerRoom').value,
        phone: this.registrationForm.get('phone').value,
        website: this.registrationForm.get('website').value,
        picture: this.urlImage,
        stars: this.registrationForm.get('stars').value,
        location: {
          id: this.registrationForm.get('city').value
        }
      })
      .then(response => {
        this.hotelCreatedSuccessfully();
      })
      .catch(error => {
        this.errorOcurred();
      });
  }

  private errorOcurred() {
    let config: SweetAlertOptions = {
      title: 'Ha ocurrido un error al agregar el hotel',
      type: 'error',
      showConfirmButton: true
    };
    Swal.fire(config).then(result => {
    });
  }

  private hotelCreatedSuccessfully() {
    let config: SweetAlertOptions = {
      title: 'Hotel creado',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    };
    Swal.fire(config).then(result => {
      this.goToViewHotels();
    });
  }
}
