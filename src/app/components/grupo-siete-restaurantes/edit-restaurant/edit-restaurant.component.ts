import { ApiService } from '../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../../classes/role';
import { Location } from "@angular/common";
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Restaurant } from '../../../interfaces/restaurant';
import { transformImageToBase64 } from '../../../utils/global_functions';
import { environment as url } from '../../../../environments/environment';
import { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.scss']
})
export class EditRestaurantComponent implements OnInit {

    public restaurant: Restaurant;
    public urlImage: string;
    public registrationForm: FormGroup;
    public transformImageToBase64;
    public isDataLoaded: boolean;

    constructor(private _location: Location, private localStorage: LocalStorageService, private service: ApiService){
      this.isDataLoaded = false;
      this.transformImageToBase64 = transformImageToBase64;
      this.urlImage = null;
    }

    ngOnInit() {
      console.log('AQUI ESTOY');
      this.localStorage.getItem('restaurant').subscribe(data => {
        if (data) {
          this.isDataLoaded = true;
          console.log('Aqui tambien');
          this.restaurant = data;
          console.log(data);
          this.createNewFormGroup(data);
        }
      });
    }

    ngOnDestroy() {
      this.localStorage.removeItem('restaurant');
    }

    public createNewFormGroup(data){
      if (data) {
        this.urlImage = data['picture'];
        this.registrationForm = new FormGroup({
          name : new FormControl(data['name'],[
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100)
          ]),
          businessName : new FormControl(data['businessName'],[
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100)
          ]),
          description : new FormControl(data['description'],[
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100)
          ]),
          capacity : new FormControl(data['capacity'],[
            Validators.required,
            Validators.min(1)
          ]),
          address: new FormControl(data['address'],[
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50)
          ]),
          price: new FormControl(data['price'],[
            Validators.pattern("^[0-9]+(.[0-9]{0,5})?$"),
            Validators.required,
            Validators.min(1)
          ]),
          phone : new FormControl(data['phone'],[
            Validators.required,
            Validators.pattern("^((\\+)|(00)|(\\*)|())[0-9]{3,14}((\\#)|())$")
          ]),
          stars: new FormControl(data['qualify'],[
            Validators.required,
            Validators.min(1),
            Validators.max(5)
          ]),
          image: new FormControl(this.urlImage, []),
          type: new FormControl(data['specialty'],[
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50)
          ])
        });
      }
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

    private restaurantEditedSuccessfully(){
      let config: SweetAlertOptions = {
        title: 'Restaurante actualizado',
        type: 'success',
        showConfirmButton: false,
        timer: 1500
      }
      Swal.fire(config).then( result =>{
        //console.log(result);
        this.goToViewRestaurants();
      });
    }

    private errorOcurred(){
      let config: SweetAlertOptions = {
        title: 'Ha ocurrido un error al agregar el restaurante',
        type: 'error',
        showConfirmButton: true
      }
      Swal.fire(config).then( result =>{
        // console.log(result);
      });
    }

    public onSubmit(){
      let idRes;
      this.localStorage.getItem('restaurant').subscribe( data => {
        idRes = data['id'];
        this.registrationForm.value.picture = this.urlImage;
        this.service
        .putUrl(url.endpoint.default._put.putRestaurant,
          {
            id: idRes,
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
            location: 1,
            address: this.registrationForm.get('address').value
          })
        .then(
          response => {
            // IF LA RESPUESTA ES EXITOSA
            this.restaurantEditedSuccessfully();
            // SI NO MOSTRAR MENSAJE DE ERROR
            // this.hotelNotCreatedSuccessfully();
            // TODO -> VALIDAR LA RESPUESTA
              console.log(response);
          }).catch(
            error => {
              console.log("Hay un error");
              this.errorOcurred();
            }
          );
      });
     }

}
