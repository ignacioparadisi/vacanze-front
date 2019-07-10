import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import{Consulta_autoComponent} from '../consultar_auto/consultar_auto';
import { Auto } from '../../../classes/auto';
import { ModifyTravelComponent } from '../../travel/modify-travel/modify-travel';


@Component({
  selector: 'app-registrar_auto',
  templateUrl: './registrar_auto.html',
  styleUrls: ['./registrar_auto.scss'],
  providers: [ApiService]
})
export class Registrar_AutoComponent implements OnInit {
    closeResult: string;
    public formGroup:FormGroup;
    form: FormGroup;
    public countries=[];
    public respuesta=[];
    public autos =[];
    public nombreciudad:string ;
    public  modificarauto  =[];
    public x =[] ;
 
    auto: Auto[] = [];
 
    constructor(  public fb: FormBuilder,private apiService: ApiService,private modalService: NgbModal) {

      this.form = this.fb.group({
     
        matricula: ['', [Validators.required,  Validators.minLength(1),
            Validators.maxLength(100)]],
        capacidad : ['', [Validators.required,  Validators.minLength(1),
          Validators.maxLength(100)]],
         estatus : ['', [Validators.required,  Validators.minLength(1),
            Validators.maxLength(100)]],
         ciudad : ['', [Validators.required,  Validators.minLength(1),
               Validators.maxLength(100)]]
      });
      this.getciudad();
    }
  
    ngOnInit() {
      
      this.formGroup = new FormGroup({
          ciudad: new FormControl("", [Validators.required]),
          estatus: new FormControl("", [Validators.required]),
          marca: new FormControl("", [Validators.required]),
          modelo: new FormControl("", [Validators.required]),
          matricula: new FormControl("", [Validators.required]),
          capacidad: new FormControl("", [Validators.required]),
          precio : new FormControl("", [Validators.required]),
          foto: new FormControl(" " , [Validators.required]),
          
       })
  

    }
    openLg(content) {
      this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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
  
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
  
    deleteFile(auto) {
      this.modificarauto=auto;
  
      var  v_id=this.modificarauto["_id"] ;
      const requestURL = 'Auto/eliminar/'+v_id;
      this.apiService.getUrl(requestURL).then(
        response => {
            this.respuesta = response;
            console.log(response);
            this.consultarauto();
            this.autos = response;
        }, error => {
            console.log(error);
            this.consultarauto();
        });
      
      console.log('Registro eliminado');
    }
    openAddAutoModal(Auto?: Auto) {
      const modalRef = this.modalService.open(Consulta_autoComponent);
     
      modalRef.componentInstance.Auto = Auto;

    }
    public invalid(controlName: string, form: FormGroup) {
      return form.get(controlName).touched && !form.get(controlName).valid;
  }
  
  public valid(controlName: string, form: FormGroup) {
      return form.get(controlName).touched && form.get(controlName).valid;
  } 
    open(content, auto ) {
      this.modificarauto=auto;

     this.modalService.open(content).result.then((result) => {
         this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
  }  
    public obtenervariables() {
    this.form.get('ciudad').markAsTouched();
    this.form.get('matricula').markAsTouched();
  
    this.form.get('capacidad').markAsTouched();
    this.form.get('estatus').markAsTouched();

  }
 

  public obtenervariablesmodificar() {
    this.formGroup.get('ciudad').markAsTouched();
    this.formGroup.get('estatus').markAsTouched();
    this.formGroup.get('marca').markAsTouched();
    this.formGroup.get('modelo').markAsTouched();
    this.formGroup.get('matricula').markAsTouched();
    this.formGroup.get('capacidad').markAsTouched();
    this.formGroup.get('precio').markAsTouched();
    this.formGroup.get('foto').markAsTouched();

  }
 public consultarauto(){
  this.obtenervariables();
  var matricula = this.form.value.matricula;
  var ciudad = this.form.value.ciudad;
  var capacidad = this.form.value.capacidad;
  var estatus =this.form.value.estatus;
  this.nombreciudad = this.countries [ciudad - 1 ];
  
  if (matricula == null || matricula== ""){
     matricula= "null";
  
  }
  if (capacidad == null || capacidad == "" ){
    capacidad="0";
    
  }
  if (estatus == "null"  || estatus== "" || estatus== null ){
    estatus="null"
  }
  if (ciudad == "null" || ciudad ==""){
    console.log('se necesita una ciudad para la busqueda ');
  }else {
    const requestURL = 'Auto/getforall/'+ ciudad + '/'+ estatus + '/' + matricula + '/'+ capacidad; 
    this.apiService.getUrl(requestURL).then(
      response => {
          this.respuesta = response;
          console.log(response);
          this.autos = response;
      }, error => {
          console.log(error);
      });
    

  }
 
 }


 modificar(){
  this.auto=this.modificarauto;
  
  var x =this.auto["_capacity"];
  this.obtenervariablesmodificar();
  var v_ciudad= this.formGroup.value.ciudad;
  var v_estatus= this.formGroup.value.estatus;
  var v_marca= this.formGroup.value.marca;
  var v_modelo= this.formGroup.value.modelo;
  var v_matricula= this.formGroup.value.matricula;
  var v_capacidad= this.formGroup.value.capacidad;
  var v_precio= this.formGroup.value.precio;
  var v_foto= this.formGroup.value.foto;
  if (v_ciudad== "" || v_ciudad== null || v_ciudad==" ")
  {
    v_ciudad=this.auto["_place"];
  }
  if (v_estatus== "" || v_estatus== null || v_estatus==" ")
  {
    v_estatus=this.auto["_isActive"];
  }
  if (v_modelo== "" || v_modelo== null || v_modelo==" ")
  {
    v_modelo=this.auto["_model"];
  }
  if (v_marca== "" || v_marca== null ||v_marca==" ")
  {
    v_marca=this.auto["_make"];
  }
  if (v_matricula== "" || v_matricula== null ||v_matricula==" ")
  {
    v_matricula=this.auto["_licence"];
  }
  if (v_capacidad== "" || v_capacidad== null ||v_capacidad==" ")
  {
    v_capacidad=this.auto["_capacity"];
  }
  if (v_precio== "" || v_precio== null || v_precio==" ")
  {
    v_precio=this.auto["_price"];
  }
  var  v_id=this.auto["_id"];
   v_foto="carro.jpg";

   if (v_precio < 0 || v_capacidad <0 ){
    console.log("no se aceptan numeros negativos ");
} else {
  const requestURL = 'Auto/modificar'+ '/'+ v_id + '/'+ v_marca+ '/' + v_modelo+ '/'+ v_capacidad + '/'+ v_estatus + '/'+  v_matricula + '/'+  v_precio + '/'+ v_foto + '/'+ v_ciudad; 
  this.apiService.getUrl(requestURL).then(
    response => {
        this.respuesta = response;
        console.log(response);
        this.consultarauto();
        this.autos = response;
    }, error => {
        console.log(error);
    });
    }
  }
}