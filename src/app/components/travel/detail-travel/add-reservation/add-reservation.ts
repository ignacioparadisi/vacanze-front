import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, NgbDate, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

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
  private travel = JSON.parse(localStorage.getItem("travel"));
  private cityId: string = this.activatedRoute.snapshot.paramMap.get("cityId");;
  availableReservations: Array<object>

  constructor(private modalService: NgbModal, private apiService: ApiService, private activatedRoute: ActivatedRoute) {
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

  addReservation(id: number) {
    console.log(id);
  }
}