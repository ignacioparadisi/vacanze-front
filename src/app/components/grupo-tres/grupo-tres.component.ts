import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-grupo-tres',
  templateUrl: './grupo-tres.component.html',
  styleUrls: ['./grupo-tres.component.scss']
})
export class GrupoTresComponent implements OnInit {
  constructor(private modalService: NgbModal) { }

  closeResult: string;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  time = {hour: 13, minute: 30};

  open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    ngOnInit() {
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

}
