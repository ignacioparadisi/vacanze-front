import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { environment as url } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { transformImageToBase64 } from '../../../utils/global_functions';

@Component({
  selector: 'app-consultar-auto',
  templateUrl: './consultar_auto.html',
  styleUrls: ['./consultar_auto.scss'],
  providers: [ApiService]
})
export class Consulta_autoComponent implements OnInit {
  public transformImageToBase64;
  form: FormGroup;
  public urlImage: string;
  closeResult: string;
  public auto = [];
  public countries=[];
  public respuesta=[];

  constructor(
    public fb: FormBuilder,private apiService: ApiService,private modalService: NgbModal
  ) {
    this.urlImage = null
    this.transformImageToBase64 = transformImageToBase64;
    this.form = this.fb.group({
      marca: ['', [Validators.required,  Validators.minLength(1),
          Validators.maxLength(100)]],
      modelo: ['', [Validators.required,  Validators.minLength(1),
          Validators.maxLength(100)]],
      matricula: ['', [Validators.required,  Validators.minLength(1),
          Validators.maxLength(100)]],
      capacidad : ['', [Validators.required,  Validators.minLength(1),
        Validators.maxLength(100)]],
       estatus : ['', [Validators.required,  Validators.minLength(1),
          Validators.maxLength(100)]],
       precio : ['', [Validators.required,  Validators.minLength(1),
          Validators.maxLength(100)]],
       ciudad : ['', [Validators.required,  Validators.minLength(1),
             Validators.maxLength(100)]],
       foto : ['', [Validators.required,  Validators.minLength(1),
        Validators.maxLength(100)]]
    });
    this.getciudad();
  }
 ngOnInit() { }
 saveData(){
    console.log(this.form.value);
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return `with: ${reason}`;
  }
}
  getciudad(){
          
           const requestURL = 'Auto/getcity';
           this.apiService.getUrl(requestURL).then(
               response => {
                   this.countries = response;
               },
               error => {
                   console.log(error);
               }
           );
  }
  
  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
}

public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
} 
agregarcarro(){
  this.markAllAsTouched();
  console.log(this.form.value);
  console.log(this.form.value.ciudad);
  if (this.form.value.capacidad<0 || this.form.value.precio<0  ){
    console.log("no se puede agregar  numeros negativos no se aceptan ");
  } else {
    const requestURL = 'Auto/agregar/' + this.form.value.marca + '/'+ this.form.value.modelo+'/'+this.form.value.capacidad + '/'+ this.form.value.estatus   + '/'+ this.form.value.matricula + '/' + this.form.value.precio + '/'+ this.form.value.ciudad  ;
    this.apiService.getUrl(requestURL).then(
      response => {
          this.respuesta = response;
          console.log(response);
      }, error => {
          console.log(error);
      });

  }

}

public submit(){}

public markAllAsTouched() {
  this.form.get('ciudad').markAsTouched();
  this.form.get('matricula').markAsTouched();
  this.form.get('marca').markAsTouched();
  this.form.get('modelo').markAsTouched();
  this.form.get('estatus').markAsTouched();
  this.form.get('capacidad').markAsTouched();
  this.form.get('precio').markAsTouched();
}
public getImage(event){
  this.transformImageToBase64(event, image => {
    this.urlImage = image;
  });
}

}