 import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.html',
  styleUrls: ['./detalle.scss']
})
export class DetalleComponent  {
    activeModal: NgbModalRef;
    private userId: string;
    public formGroup: FormGroup;
    CommentForm: FormGroup;
    
    @Output() spread = new EventEmitter();
    
    constructor(private modalService: NgbModal, private apiService: ApiService/*localStorage: LocalStorageService*/) {
     /*  this.localStorage.getItem("id").subscribe(data => {
        if (data) {
          this.userId = data
          this.CommentForm = new FormGroup({
            Comment: new FormControl('', Validators.required),
            init: new FormControl('', Validators.required),
            Commentid: new FormControl(this.userId, Validators.required),

          });
        }
      })*/
    }
   
  closeModal() {
    this.activeModal.close();
  }

    
}