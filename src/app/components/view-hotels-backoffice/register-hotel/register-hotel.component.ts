import { ApiService } from '../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../../classes/role';
import { Location } from "@angular/common";
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { environment as url } from '../../../../environments/environment';

@Component({
  selector: 'app-register-hotel',
  templateUrl: './register-hotel.component.html',
  styleUrls: ['./register-hotel.component.scss']
})
export class RegisterHotelComponent implements OnInit {


  public registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    capacity: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    rooms: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern("^((\\+)|(00)|(\\*)|())[0-9]{3,14}((\\#)|())$")
    ]),
    web: new FormControl('', [
      Validators.required,
      Validators.pattern("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})")
    ])
  });

  constructor(private _location: Location, private service: ApiService) { }

  ngOnInit() {
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get phone() {
    return this.registrationForm.get('phone');
  }

  get capacity() {
    return this.registrationForm.get('capacity');
  }

  get rooms() {
    return this.registrationForm.get('rooms');
  }

  get web() {
    return this.registrationForm.get('web');
  }

  public goToViewHotels() {
    this._location.back();
  }

  public onSubmit() {
    this.service
      .postUrl(url.endpoint.default._post.postHotel,
        {
          name: this.registrationForm.get('name').value,
          amountOfRooms: this.registrationForm.get('rooms').value,
          isActive: true,
          phone: this.registrationForm.get('phone').value,
          website: this.registrationForm.get('web').value
        })
      .then(
        response => {
          //TODO -> REDIRECCIONAR AL LISTADO DE HOTELES
          //TODO -> VALIDAR LA RESPUESTA
          console.log(response);
        }).catch(
          error => {
            console.log(error);
          }
        );
  }

}

