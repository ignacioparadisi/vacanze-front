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
import { LocalStorageService } from '../../../services/local-storage.service';
import { Hotel } from '../../../interfaces/hotel';
import { transformImageToBase64 } from '../../../utils/global_functions';
import { environment as url } from '../../../../environments/environment';
import { SweetAlertOptions } from 'sweetalert2';
import { HotelsService } from '../services/hotels.service';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.scss'],
  providers: [ApiService]
})
export class EditHotelComponent implements OnInit {
  public hotel: Hotel;
  public urlImage: string;
  public registrationForm: FormGroup;
  public transformImageToBase64;
  public isDataLoaded: boolean;
  public countries: any[];
  public cities: any[];

  public selectedACountry: boolean;

  constructor(
    private _location: Location,
    private service: ApiService,
    private localStorage: LocalStorageService
  ) {
    this.isDataLoaded = false;
    this.transformImageToBase64 = transformImageToBase64;
    this.urlImage = null;
  }

  ngOnInit() {
    this.localStorage.getItem('hotel').subscribe(storedHotel => {
      if (storedHotel) {
        this.isDataLoaded = true;
        this.hotel = storedHotel;
        this.createNewFormGroup(storedHotel);
        this.getCountry();
      }
    });
  }

  ngOnDestroy() {
    this.localStorage.removeItem('hotel');
  }

  private createNewFormGroup(storedHotel: Hotel) {
    if (storedHotel) {
      this.urlImage = storedHotel['picture'];
      this.registrationForm = new FormGroup({
        name: new FormControl(storedHotel['name'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]),
        amountOfRooms: new FormControl(storedHotel['amountOfRooms'], [
          Validators.required,
          Validators.min(1)
        ]),
        roomCapacity: new FormControl(storedHotel['roomCapacity'], [
          Validators.required,
          Validators.min(1)
        ]),
        addressSpecification: new FormControl(
          storedHotel['addressSpecification'],
          [Validators.maxLength(50)]
        ),
        pricePerRoom: new FormControl(storedHotel['pricePerRoom'], [
          Validators.pattern('^[0-9]+(.[0-9]{0,5})?$'),
          Validators.required,
          Validators.min(1)
        ]),
        phone: new FormControl(storedHotel['phone'], [
          Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s./0-9]*$')
        ]),
        website: new FormControl(storedHotel['website'], [
          Validators.pattern(
            '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})'
          )
        ]),
        stars: new FormControl(storedHotel['stars'], [
          Validators.required,
          Validators.min(1),
          Validators.max(5)
        ]),
        image: new FormControl(this.urlImage, [Validators.required]),
        country: new FormControl(storedHotel['location']['country'], []),
        city: new FormControl(storedHotel['location']['city'], [])
      });
    }
  }

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

  public getCountry() {
    this.service.getUrl(url.endpoint.default._get.getCountry).then(
      response => {
        this.countries.forEach(location => {
          if (location.country == this.hotel.location['country']) {
            this.registrationForm.get('country').setValue(location.id);
            this.getCity(location.id);
          }
        });
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
          this.cities.forEach(location => {
            if (location.city == this.hotel.location['city']) {
              this.registrationForm.get('city').setValue(location.id);
            }
          });
        },
        error => console.error(error)
      );
  }

  public selectCountry(event) {
    this.getCity(event.target.value);
  }

  public goToViewHotels() {
    this._location.back();
  }

  public onSubmit() {
    let idHotel;
    this.localStorage.getItem('hotel').subscribe(storedHotel => {
      idHotel = storedHotel['id'];
      this.service
        .putUrl(
          url.endpoint.default._put.putHotel,
          {
            id: idHotel,
            name: this.registrationForm.get('name').value,
            amountOfRooms: this.registrationForm.get('amountOfRooms').value,
            roomCapacity: this.registrationForm.get('roomCapacity').value,
            isActive: true,
            addressSpecification: this.registrationForm.get(
              'addressSpecification'
            ).value,
            pricePerRoom: this.registrationForm.get('pricePerRoom').value,
            phone: this.registrationForm.get('phone').value,
            website: this.registrationForm.get('website').value,
            picture: this.urlImage,
            stars: this.registrationForm.get('stars').value,
            location: {
              id: this.registrationForm.get('city').value
            }
          },
          [idHotel.toString()]
        )
        .then(response => {
          this.hotelCreatedSuccessfully();
        })
        .catch(error => {
          this.errorOcurred();
        });
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
      title: 'Hotel Modificado',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    };
    Swal.fire(config).then(result => {
      this.goToViewHotels();
    });
  }
}
