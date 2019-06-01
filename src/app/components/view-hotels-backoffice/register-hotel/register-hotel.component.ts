import { ApiService } from '../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../../classes/role';
import { Location } from "@angular/common";
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { environment as url } from '../../../../environments/environment';
import { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-hotel',
  templateUrl: './register-hotel.component.html',
  styleUrls: ['./register-hotel.component.scss'],
  providers: [ApiService]
})
export class RegisterHotelComponent implements OnInit {

public registrationForm : FormGroup = new FormGroup({
    name : new FormControl(null,[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    amountOfRooms : new FormControl(null,[
      Validators.required,
      Validators.min(1)
    ]),
    roomCapacity : new FormControl(null,[
      Validators.required,
      Validators.min(1)
    ]),
    addressSpecification: new FormControl(null,[
      Validators.maxLength(50)
    ]),
    pricePerRoom: new FormControl(null,[
      Validators.pattern("^[0-9]+(.[0-9]{0,5})?$"),
      Validators.required,
      Validators.min(1)
    ]),
    phone : new FormControl(null,[
      Validators.pattern("^((\\+)|(00)|(\\*)|())[0-9]{3,14}((\\#)|())$")
    ]),
    website : new FormControl(null,[
      Validators.pattern("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})")
    ]),
    stars: new FormControl(null,[
      Validators.required,
      Validators.min(1),
      Validators.max(5)
    ])
    // TODO -> añadir piture y location
  });



  constructor(private _location: Location, private service: ApiService){}

  ngOnInit() {
  }

  get name(){
    return this.registrationForm.get('name');
  }

  get amountOfRooms(){
    return this.registrationForm.get('amountOfRooms');
  }

  get roomCapacity(){
    return this.registrationForm.get('roomCapacity');
  }

  get addressSpecification(){
    return this.registrationForm.get('addressSpecification');
  }

  get pricePerRoom(){
    return this.registrationForm.get('pricePerRoom');
  }

  get phone(){
    return this.registrationForm.get('phone');
  }

  get website(){
    return this.registrationForm.get('website');
  }

  get stars(){
    return this.registrationForm.get('stars');
  }



  public goToViewHotels(){
    this._location.back();
  }


  public onSubmit(){
    this.service
    .postUrl(url.endpoint.default._post.postHotel,
      {
        name: this.registrationForm.get('name').value,
        amountOfRooms: this.registrationForm.get('amountOfRooms').value,
        roomCapacity: this.registrationForm.get('roomCapacity').value,
        isActive : true,
        addressSpecification: this.registrationForm.get('addressSpecification').value,
        pricePerRoom: this.registrationForm.get('pricePerRoom').value,
        phone: this.registrationForm.get('phone').value,
        website: this.registrationForm.get('website').value,
        picture: "ffdsfdsfsdfsdioj", // TODO -> convertidor base64
        stars: this.registrationForm.get('stars').value,
        location: {
          "id" : 1
        } // TODO -> id de location
      })
    .then(
      response => {
        //IF LA RESPUESTA ES EXITOSA
            this.hotelCreatedSuccessfully();
        //SI NO MOSTRAR MENSAJE DE ERROR
            //this.hotelNotCreatedSuccessfully();
        //TODO -> VALIDAR LA RESPUESTA
        console.log(response);
      }).catch(
        error => {
          console.log("Hay un error");
          this.errorOcurred();
        }
      );
   }


   private errorOcurred(){
     let config: SweetAlertOptions = {
       title: 'Ha ocurrido un error al agregar el hotel',
       type: 'error',
       showConfirmButton: true
     }
     Swal.fire(config).then( result =>{
       //console.log(result);
     });
   }

   private hotelCreatedSuccessfully(){
     let config: SweetAlertOptions = {
       title: 'Hotel creado',
       type: 'success',
       showConfirmButton: false,
       timer: 1500
     }
     Swal.fire(config).then( result =>{
       //console.log(result);
       this.goToViewHotels();
     });
   }

}