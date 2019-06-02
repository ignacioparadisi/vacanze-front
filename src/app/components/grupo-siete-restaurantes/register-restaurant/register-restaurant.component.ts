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
import { transformImageToBase64 } from '../../../utils/global_functions';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.scss']
})
export class RegisterRestaurantComponent implements OnInit {

public transformImageToBase64;
public urlImage: string;
public countries: any[];
public cities: any[];

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
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    price: new FormControl(null,[
      Validators.pattern("^[0-9]+(.[0-9]{0,5})?$"),
      Validators.required,
      Validators.min(1)
    ]),
    phone : new FormControl(null,[
      Validators.required,
      Validators.pattern("^((\\+)|(00)|(\\*)|())[0-9]{3,14}((\\#)|())$")
    ]),
    stars: new FormControl(null,[
      Validators.required,
      Validators.min(1),
      Validators.max(5)
    ]),
    image: new FormControl(null, []),
    type: new FormControl(null,[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    country: new FormControl(null, [
      Validators.required
    ]),
    city: new FormControl(null, [
      Validators.required
    ])
    // TODO -> añadir piture y location
  });

  constructor(private _location: Location, private service: ApiService){
    this.transformImageToBase64 = transformImageToBase64;
    this.urlImage = null;
    this.countries = [];
    this.getCountry();
  }

  ngOnInit() {
  }

  public getCity(id: number) {
    this.service
        .getUrl(url.endpoint.default._get.getCity, [id.toString()])
        .then(response => {
            this.cities = response;
    }, error => console.error(error));
  }

  public getCountry() {
    this.service
        .getUrl(url.endpoint.default._get.getCountry)
        .then(response => {
            this.countries = response;
    }, error => console.error(error));
  }
  
  get name(){
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

  public getImage(event){
    this.transformImageToBase64(event, image => {
      this.urlImage = image;
    });
  }

  get type(){
    return this.registrationForm.get('type');
  }


  public goToViewRestaurants(){
    this._location.back();
  }


  public onSubmit(){
    this.registrationForm.value.picture = this.urlImage;
    this.service
    .postUrl(url.endpoint.default._post.postRestaurant,
      {
        name: this.registrationForm.get('name').value,
        capacity: this.registrationForm.get('capacity').value,
        isActive : true,
        qualify: this.registrationForm.get('stars').value,
        specialty: this.registrationForm.get('type').value,
        price: this.registrationForm.get('price').value,
        businessName: this.registrationForm.get('businessName').value,
        picture: this.urlImage,
        description: this.registrationForm.get('description').value,
        phone: this.registrationForm.get('phone').value,
        location: this.registrationForm.get('city').value,
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