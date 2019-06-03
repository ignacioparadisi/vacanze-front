import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbDate, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';

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
  @Output() spread = new EventEmitter();
  
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  private travelForm: FormGroup;

  constructor(private modalService: NgbModal, private apiService: ApiService) {
    
  }

  open(content) {
    this.activeModal = this.modalService.open(content);
    this.travelForm = new FormGroup({
      id: new FormControl(this.travelId, Validators.required),
      name: new FormControl(this.travelName, Validators.required),
      description: new FormControl(this.travelDescription),
      init: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required)
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  modifyTravel() {
    this.apiService.putUrl('travels', this.travelForm.value).then(
      (resp) => {
        this.closeModal();
        Swal.fire({
          title: '!Éxito¡',
          text: 'El viaje se modificó satisfactoriamente.',
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

  onDateSelection(date: NgbDate) {
    const today = new Date;
    const todayDay = today.getDate().valueOf();
    const todayMonth = today.getMonth().valueOf() + 1;
    const todayYear = today.getFullYear().valueOf();
    if (date.year >= todayYear && date.month >= todayMonth && date.day >= todayDay) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
        this.travelForm.controls['init'].setValue(this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day);
      } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
        this.toDate = date;
        this.travelForm.controls['end'].setValue(this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day);
      } else {
        this.toDate = null;
        this.fromDate = date;
        this.travelForm.controls['end'].setValue('');
        this.travelForm.controls['init'].setValue(this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day);
      }
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Debes seleccionar una fecha desde ' + todayDay + '-' + todayMonth + '-' + todayYear + ' en adelante',
        type: 'error',
      })
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