import { ApiService } from "src/app/services/api.service";
import { Component, OnInit } from "@angular/core";
import { Type } from "src/app/classes/type_of_food";
import { Calification } from "src/app/classes/calification_restaurants";
import Swal from "sweetalert2";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment as url } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.scss']
})
export class RegisterRestaurantComponent implements OnInit {

  public submitted = false;
  public formGroup: FormGroup;
  public types: Type[] = [];
  public califications: Calification[] = [];

  constructor(
    private router: Router,
    private service: ApiService,
    public activeModal: NgbActiveModal,
    private location: Location
  ) {}

  ngOnInit() {
    this.fetchTypes();
    this.fetchCalifications();

    this.formGroup = new FormGroup({
      nameRestaurant: new FormControl(null, [Validators.required, Validators.minLength(1),  Validators.maxLength(20)]),
      businessName: new FormControl(null, [Validators.required, Validators.minLength(1),  Validators.maxLength(50)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(5),  Validators.maxLength(100)]),
      calification: new FormControl(-1, [Validators.required, Validators.min(0)]),
      capacity: new FormControl(null, [Validators.required, Validators.minLength(1),  Validators.maxLength(20)]),
      price: new FormControl(null, [Validators.required, Validators.minLength(1),  Validators.maxLength(20)]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(1),  Validators.maxLength(20)]),
      address: new FormControl(null, [Validators.required, Validators.minLength(5),  Validators.maxLength(100)]),
      image: new FormControl(null, [Validators.required, Validators.min(0)]),
      type: new FormControl(-1, [Validators.required, Validators.min(0)])
    });
  }

  get form() {
    return this.formGroup.controls;
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

  private fetchCalifications(): Calification[] {
    this.califications = [
      new Calification(0, 0),
      new Calification(1, 0.5),
      new Calification(2, 1),
      new Calification(3, 1.5),
      new Calification(4, 2),
      new Calification(5, 2.5),
      new Calification(6, 3),
      new Calification(7, 3.5),
      new Calification(8, 4),
      new Calification(9, 4.5),
      new Calification(10, 5)
    ];
    return this.califications;
  }

  public onSubmit(){
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }
    this.service
    .postUrl(url.endpoint.default._post.postRestaurant,
      {
        name: this.formGroup.get('nameRestaurant').value,
        capacity: this.formGroup.get('capacity').value,
        isActive : true,
        qualify: this.formGroup.get('calification').value,
        specialty: this.formGroup.get('type').value,
        price: this.formGroup.get('price').value,
        businessName: this.formGroup.get('businessName').value,
        picture: "logo",
        description: this.formGroup.get('description').value,
        phone: this.formGroup.get('phone').value,
        location: 1,
        address: this.formGroup.get('address').value
      })
    .then(
      response => {
        //TODO -> REDIRECCIONAR AL LISTADO DE HOTELES
        //TODO -> VALIDAR LA RESPUESTA
        location.reload();
        console.log(response);
      }).catch(
        error => {
          console.log(error);
        }
      );
   }

}
