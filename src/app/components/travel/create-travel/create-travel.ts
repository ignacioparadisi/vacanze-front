import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbDate, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;


  constructor(private modalService: NgbModal, private apiService: ApiService) {
  }

  open(content) {
    this.activeModal = this.modalService.open(content);
    this.travelForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      userId: new FormControl('5', Validators.required),
      dateIni: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required)
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  createTravel() {
    console.log(this.travelForm.value)
    /*this.apiService.postUrl('travels', this.travelForm.value).then(
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
    );*/
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.travelForm.controls['dateIni'].setValue(this.fromDate);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.travelForm.controls['dateEnd'].setValue(this.toDate);
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.travelForm.controls['dateEnd'].setValue('');
      this.travelForm.controls['dateIni'].setValue(this.fromDate);
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}