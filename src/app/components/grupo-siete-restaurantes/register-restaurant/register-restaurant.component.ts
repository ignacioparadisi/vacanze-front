import { ApiService } from '../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Type } from '../../../classes/type_of_food';
import { Role } from '../../../classes/role';
import { Location } from "@angular/common";
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { environment as url } from '../../../../environments/environment';
import { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.scss']
})
export class RegisterRestaurantComponent implements OnInit {

public registrationForm: FormGroup = new FormGroup({
    name : new FormControl(null,[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    businessName : new FormControl(null,[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    description : new FormControl(null,[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    capacity : new FormControl(null,[
      Validators.required,
      Validators.min(1)
    ]),
    address: new FormControl(null,[
      Validators.maxLength(50)
    ]),
    price: new FormControl(null,[
      Validators.pattern("^[0-9]+(.[0-9]{0,5})?$"),
      Validators.required,
      Validators.min(1)
    ]),
    phone : new FormControl(null,[
      Validators.pattern("^((\\+)|(00)|(\\*)|())[0-9]{3,14}((\\#)|())$")
    ]),
    stars: new FormControl(null,[
      Validators.required,
      Validators.min(1),
      Validators.max(5)
    ]),
    image: new FormControl(null, [
      Validators.required,
      Validators.min(0)
    ]),
    type: new FormControl(-1, [
      Validators.required,
      Validators.min(0)
    ])
    // TODO -> añadir piture y location
  });

  public types: Type[] = [];

  constructor(private _location: Location, private service: ApiService){}

  ngOnInit() {
    this.fetchTypes();
  }

  private fetchTypes(): Type[] {
    this.types = [
      new Type(0, 'Arabe'),
      new Type(1, 'Italiana'),
      new Type(2, 'Hindú'),
      new Type(3, 'Japonesa'),
      new Type(4, 'Mexicana'),
      new Type(5, 'Mediterranea'),
      new Type(6, 'Rapida'),
      new Type(7, 'Vegana')
    ];
    return this.types;
  }

  /*get name(){
    return this.registrationForm.get('name');
  }

  get businessName(){
    return this.registrationForm.get('businessName');
  }

  get description(){
    return this.registrationForm.get('description');
  }

  get capacity(){
    return this.registrationForm.get('capacity');
  }

  get address(){
    return this.registrationForm.get('address');
  }

  get price(){
    return this.registrationForm.get('price');
  }

  get phone(){
    return this.registrationForm.get('phone');
  }

  get stars(){
    return this.registrationForm.get('stars');
  }

  get image(){
    return this.registrationForm.get('image');
  }

  get type(){
    return this.registrationForm.get('type');
  }*/


  public goToViewRestaurants(){
    this._location.back();
  }


  public onSubmit(){
    this.service
    .postUrl(url.endpoint.default._post.postRestaurant,
      {
        name: this.registrationForm.get('nameRestaurant').value,
        capacity: this.registrationForm.get('capacity').value,
        isActive : true,
        qualify: this.registrationForm.get('stars').value,
        specialty: this.registrationForm.get('type').value,
        price: this.registrationForm.get('price').value,
        businessName: this.registrationForm.get('businessName').value,
        picture: "logo",
        description: this.registrationForm.get('description').value,
        phone: this.registrationForm.get('phone').value,
        location: 1,
        address: this.registrationForm.get('address').value
      })
    .then(
      response => {
        //IF LA RESPUESTA ES EXITOSA
            this.restaurantCreatedSuccessfully();
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
       title: 'Ha ocurrido un error al agregar el restaurante',
       type: 'error',
       showConfirmButton: true
     }
     Swal.fire(config).then( result =>{
       //console.log(result);
     });
   }

   private restaurantCreatedSuccessfully(){
     let config: SweetAlertOptions = {
       title: 'Restaurante creado',
       type: 'success',
       showConfirmButton: false,
       timer: 1500
     }
     Swal.fire(config).then( result =>{
       //console.log(result);
       this.goToViewRestaurants();
     });
   }

}
