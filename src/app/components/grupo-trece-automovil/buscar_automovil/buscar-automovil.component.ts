import { Component, OnInit } from '@angular/core';
//import { reservationRestaurant } from 'src/app/classes/reservation-restaurant'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-buscar-automovil',
  templateUrl: './buscar-automovil.component.html',
  styleUrls: ['./buscar-automovil.component.scss']
})

export class BuscarAutomovilComponent implements OnInit {
  locations= [];
  //public countPeople: reservationRestaurant[]=[]
  public form: FormGroup;

  constructor(private fb: FormBuilder,private service:ApiService) { }

  ngOnInit() {
    this.form = this.fb.group({
  //    CheckIn:[null, Validators.compose([Validators.required])],
  //    CheckOut:[null, Validators.compose([Validators.required])],
  //    City:[null, Validators.compose([Validators.required])], 
      Country:[null, Validators.compose([Validators.required])]
      });
    this.getLocations();
  }

  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
}

public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
}

public markAllAsTouched() {
 // this.form.get('CheckIn').markAsTouched();
 // this.form.get('CheckOut').markAsTouched();
  this.form.get('Country').markAsTouched();
//  this.form.get('City').markAsTouched();
}

public submit(){
  console.log("Entro en submit()");
  this.markAllAsTouched();
  console.log(this.form.value);
}

  getLocations(){
    const requestURL = "locations/";
    this.service.getUrl(requestURL).then(
  response=>{
  this.locations = response;
  console.log(response);
  },
      error=>{
          console.log(error);
      }
    )
}

}
