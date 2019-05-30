import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'create-travel',
  templateUrl: './create-travel.html',
  styleUrls: ['./create-travel.scss'],
  providers: [NgbModal]
})

export class CreateTravelComponent {

  @Output() spread = new EventEmitter();
  activeModal: NgbModalRef;
  public formGroup: FormGroup;

  travelForm: FormGroup;

  constructor(private modalService: NgbModal, private apiService: ApiService) {
  }

  open(content) {
    this.activeModal = this.modalService.open(content);
    this.travelForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      userId: new FormControl('5', Validators.required)
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  createTravel() {
    this.apiService.postUrl('travels', this.travelForm.value).then(
      (resp) => {
        this.closeModal();
        Swal.fire({
          title: '!Éxito¡',
          text: 'El viaje se creo satisfactoriamente.',
          type: 'success'
        });
        this.spread.emit();
      },
      (fail) => {
        Swal.fire({
          title: 'Error: ' + fail.status,
          text: fail.name + '. ' + fail.statusText,
          type: 'error',
        })
      }
    );
  }
}