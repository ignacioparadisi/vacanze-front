import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import{Consulta_autoComponent} from '../consultar_auto/consultar_auto';
import { Auto } from '../../../classes/auto';

@Component({
  selector: 'app-registrar_auto',
  templateUrl: './registrar_auto.html',
  styleUrls: ['./registrar_auto.scss']
})
export class Registrar_AutoComponent implements OnInit {
    closeResult: string;
    public formGroup:FormGroup;
 
    Auto: Auto[] = [];
 
    constructor( public fb: FormBuilder, private modalService: NgbModal) {
    }
  
    ngOnInit() {
  
      this.formGroup = new FormGroup({
          ciudad: new FormControl(-1, [Validators.required]),
          estado: new FormControl(-1, [Validators.required])
       })
    }
    openLg(content) {
      this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
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
   /* saveData(){
      console.log(this.myForm.value);
    }*/
    open(content) {
     this.modalService.open(content).result.then((result) => {
         this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
  }

  }
  