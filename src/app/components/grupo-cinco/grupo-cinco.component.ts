import { ApiService } from "../../services/api.service";
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grupo-cinco',
  templateUrl: './grupo-cinco.component.html',
  styleUrls: ['./grupo-cinco.component.scss']
})
export class GrupoCincoComponent implements OnInit {
  


  closeResult: string;
  public formGroup:FormGroup;

  constructor(private modalService: NgbModal) { }

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
          return  `with: ${reason}`;
      }
  }

  ngOnInit() {
  
    this.formGroup = new FormGroup({
        ciudad: new FormControl(-1, [Validators.required]),
        estado: new FormControl(-1, [Validators.required])
     })
  }

  deleteFile(){
  }

}
