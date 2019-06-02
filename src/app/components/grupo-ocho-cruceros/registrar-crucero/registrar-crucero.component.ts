import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { transformImageToBase64 } from '../../../utils/global_functions';
import { ApiService } from '../../../services/api.service';
import { environment as url } from '../../../../environments/environment';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Cruiser } from '../../../interfaces/cruiser';

@Component({
  selector: 'app-registrar-crucero',
  templateUrl: './registrar-crucero.component.html',
  styleUrls: ['./registrar-crucero.component.scss']
})

export class RegistrarCruceroComponent implements OnInit {

  public title: string;
  public urlImage: string;
  public buttonText: string;
  public transformImageToBase64; // Variable para recibir la funcion de transformar la imagen
  public registrationForm: FormGroup;
  public formReady: boolean;
  public isButtonToAdd: boolean;
  public cruiser: Cruiser;

  constructor(private location: Location, private api: ApiService, private localStorage: LocalStorageService){ 
    this.transformImageToBase64 = transformImageToBase64;
    this.formReady = false;
    this.buttonText = "";
  }

  ngOnInit() { 
    this.registrationForm = new FormGroup({});
    this.localStorage.getItem('boat').subscribe(data =>{
      if(data){
        this.cruiser = data;
        this.createNewFormGroup(data);
        this.title = 'Editar crucero | '+this.cruiser['name'];
        this.formReady = true;
        this.isButtonToAdd = false;
        this.buttonText = 'Editar';
      }
      else {
        this.createNewFormGroup(undefined);
        this.title = 'Añadir crucero';
        this.formReady = true;
        this.buttonText = 'Agregar';
        this.isButtonToAdd = true;
      }
    }) 
  }

  ngOnDestroy() {
    this.localStorage.removeItem('boat');
  }

  public createNewFormGroup(data){
    if(data){
      this.urlImage = data['picture'];
      this.registrationForm = new FormGroup({
        name: new FormControl(data['name'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]),
        line: new FormControl(data['line'], [
          Validators.required,
          Validators.min(1)
        ]),
        capacity: new FormControl(data['capacity'], [
          Validators.required,
          Validators.min(1)
        ]),
        loadingShipCap: new FormControl(data['loadingShipCap'], [
          Validators.required,
          Validators.min(1)
        ]),
        model: new FormControl(data['model'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]),
        picture: new FormControl(this.urlImage, [
          Validators.required
        ])
      });
    }
    else {
      this.registrationForm = new FormGroup({
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
    }  
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

  /***************************************
  * Metodo para agregar un nuevo crucero * 
  ****************************************/
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

    if(this.isButtonToAdd){
      this.api.postUrl(url.endpoint.default._post.cruisers.post_cruiser, form)
      .then(response => {
        this.registrationForm.reset(); // Limpio los campos del formulario
        this.urlImage = null; // Reseteo el valor de la imagen que transforme a base 64
      })  
      .catch(error => {
        console.log("error", error);
      })
    }
    else {
      form['id'] = this.cruiser['id'];
      this.api.putUrl(url.endpoint.default._post.cruisers.post_cruiser, form)
      .then(response => {
        this.registrationForm.reset(); // Limpio los campos del formulario
        this.urlImage = null; // Reseteo el valor de la imagen que transforme a base 64
      })  
      .catch(error => {
        console.log("error", error);
      })  
    }
    
  }

}
