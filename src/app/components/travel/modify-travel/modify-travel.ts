import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'modify-travel',
  templateUrl: './modify-travel.html',
  styleUrls: ['./modify-travel.scss'],
  providers: [NgbModal]
})

export class ModifyTravelComponent {

  activeModal: NgbModalRef;
  public formGroup: FormGroup;

  @Input('travelId') travelId: number;
  @Input('travelName') travelName: string;
  @Input('travelDescription') travelDescription: string;

  private travelForm: FormGroup;

  constructor(private modalService: NgbModal) {
    
  }

  open(content) {
    this.activeModal = this.modalService.open(content);
    this.travelForm = new FormGroup({
      id: new FormControl(this.travelId, Validators.required),
      name: new FormControl(this.travelName, Validators.required),
      description: new FormControl(this.travelDescription, Validators.required),
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  modifyTravel() {
    console.log(this.travelForm.value);
  }
}