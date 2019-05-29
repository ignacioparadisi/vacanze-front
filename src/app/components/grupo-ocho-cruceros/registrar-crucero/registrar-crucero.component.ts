import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { transformImageToBase64 } from '../../../utils/global_functions';
import { ApiService } from '../../../services/api.service';
import { environment as url } from '../../../../environments/environment';

@Component({
  selector: 'app-registrar-crucero',
  templateUrl: './registrar-crucero.component.html',
  styleUrls: ['./registrar-crucero.component.scss']
})

export class RegistrarCruceroComponent implements OnInit {
  
  public urlImage: string;
  public transformImageToBase64; // Variable para recibir la funcion de transformar la imagen

  public registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    line: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    capacity: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    loadingShipCap: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    model: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    picture: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private location: Location, private api: ApiService){ 
    this.transformImageToBase64 = transformImageToBase64;
  }

  ngOnInit() {
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get line() {
    return this.registrationForm.get('line');
  }

  get capacity() {
    return this.registrationForm.get('capacity');
  }

  get loadingShipCap() {
    return this.registrationForm.get('loadingShipCap');
  }

  get model() {
    return this.registrationForm.get('model');
  }

  public getImage(event){ 
    this.transformImageToBase64(event, image => {
      this.urlImage = image;
    });
  }

  public goToCruisers(){
    this.location.back();
  }

  public onSubmit(){
    this.registrationForm.value.picture = this.urlImage;
    let form = {
      'name': this.registrationForm.value.name,
      'line': this.registrationForm.value.line,
      'model': this.registrationForm.value.model,
      'loadingShipCap': this.registrationForm.value.loadingShipCap,
      'capacity': this.registrationForm.value.capacity,
      'picture': this.registrationForm.value.picture
    }

    this.api.postUrl(url.endpoint.default._post.cruisers.post_cruiser, form)
      .then(response => {
        console.log("respuesta post >>", response);
      })  
      .catch(error => {
        console.log("error", error);
      })

  }

}
