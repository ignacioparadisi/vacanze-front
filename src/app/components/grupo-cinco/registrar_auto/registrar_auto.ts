import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import{Consulta_autoComponent} from '../consultar_auto/consultar_auto';
import { Auto } from '../../../classes/auto';


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
    public auto = [];
    public countries=[];
    public respuesta=[];
 
    Auto: Auto[] = [];
 
    constructor(  public fb: FormBuilder,private apiService: ApiService,private modalService: NgbModal) {

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
              
              console.log(response);
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
  
    deleteFile() {
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
    open(content) {
     this.modalService.open(content).result.then((result) => {
         this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
  }

  }