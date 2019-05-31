import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbDate, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

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
      dateIni: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required)
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  modifyTravel() {
    console.log(this.travelForm.value);
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