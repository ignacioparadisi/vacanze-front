import { ApiService } from '../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../../classes/role';
import { Location } from "@angular/common";
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.scss']
})
export class EditRestaurantComponent implements OnInit {


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
      image: new FormControl(null, [
        Validators.required,
        Validators.min(0)
      ]),
      type: new FormControl(null,[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ])
    });



    constructor(private _location: Location){}

    ngOnInit() {
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

    get image(){
      return this.registrationForm.get('image');
    }

    get type(){
      return this.registrationForm.get('type');
    }

    public goToViewRestaurants(){
      this._location.back();
    }

}
