import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'create-travel',
  templateUrl: './create-travel.html',
  styleUrls: ['./create-travel.scss'],
  providers: [NgbModal]
})

export class CreateTravelComponent {

  activeModal: NgbModalRef;
  public formGroup: FormGroup;

  travelForm: FormGroup;

  constructor( private modalService: NgbModal ) {
  }

  open(content) {
    this.activeModal = this.modalService.open(content);
    this.travelForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  closeModal() { 
    this.activeModal.close();
  }

  createTravel() {
    console.log(this.travelForm.value);
  }
}