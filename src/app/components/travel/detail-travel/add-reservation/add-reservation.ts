import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, NgbModalRef, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../services/api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'add-reservation-travel',
  templateUrl: './add-reservation.html',
  styleUrls: ['./add-reservation.scss'],
  providers: [NgbModal, ApiService]
})

export class AddReservationTravelComponent {

  @Output() spread = new EventEmitter();
  @Input('activeId') typeReservation: string;
  activeModal: NgbModalRef;
  private travelId: string = this.activatedRoute.snapshot.paramMap.get("travelId");
  private cityId: string = this.activatedRoute.snapshot.paramMap.get("cityId");
  availableReservations: Array<object>
  reservationForm: FormGroup;
  private userId: string;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  elementId: number

  constructor(private modalService: NgbModal, private apiService: ApiService, private activatedRoute: ActivatedRoute, private localStorage: LocalStorageService) {
    this.localStorage.getItem("id").subscribe(data => {
      if (data) {
        this.userId = data
        this.reservationForm = new FormGroup({
          element: new FormControl(null, Validators.required),
          userId: new FormControl(this.userId, Validators.required),
          init: new FormControl('', Validators.required),
          end: new FormControl('', Validators.required)
        });
      }
    })
  }

  open(content) {
    this.activeModal = this.modalService.open(content, { size: 'lg' });
    switch (this.typeReservation) {
      case 'flight':
        break;
      case 'hotel':
        this.getHotels();
        break;
      case 'vehicle':
        break;
      case 'restaurant':
        this.getRestaurants();
        break;
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  getHotels() {
    this.apiService.getUrl('hotels/?location={citiId}', [this.cityId]).then(
      (resp) => this.availableReservations = resp,
      (fail) => {
        Swal.fire({
          title: 'Error: ' + fail.status,
          text: fail.name + '. ' + fail.statusText,
          type: 'error',
        })
      }
    );
  }

  getRestaurants() {
    this.apiService.getUrl('restaurants/location/{citiId}', [this.cityId]).then(
      (resp) => this.availableReservations = resp,
      (fail) => {
        Swal.fire({
          title: 'Error: ' + fail.status,
          text: fail.name + '. ' + fail.statusText,
          type: 'error',
        })
      }
    );
  }

  addReservation(id: number, content2) {
    this.open(content2)
    this.elementId = id;
    this.reservationForm.controls['element'].setValue(id);
  }

  addElement(){
    this.apiService.postUrl('reservationrooms', this.reservationForm.value).then()
  }

  onDateSelection(date: NgbDate) {
    const today = new Date;
    today.setHours(0,0,0,0)
    const selectedDate = new Date(date.year, date.month-1, date.day)
    if (selectedDate >= today) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
        this.reservationForm.controls['init'].setValue(this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day);
      } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
        this.toDate = date;
        this.reservationForm.controls['end'].setValue(this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day);
      } else {
        this.toDate = null;
        this.fromDate = date;
        this.reservationForm.controls['end'].setValue('');
        this.reservationForm.controls['init'].setValue(this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day);
      }
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Debes seleccionar una fecha desde ' + today.getDate().valueOf() + '-' + (today.getMonth().valueOf() + 1) + '-' + today.getFullYear().valueOf() + ' en adelante',
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