import { Hotel } from './../../../interfaces/hotel';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { LocalStorageService } from '../../../services/local-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'grupo-trece-habitacion',
  templateUrl: './grupo-trece.habitacion.html',
  styleUrls: ['./grupo-trece.habitacion.scss'],
  providers: [ApiService]
})
export class HabitacionGrupoTrece implements OnInit {
  myForm: FormGroup;
  public countries = [];
  public cities = [];
  public hotels = [];
  public closeResult: string;
  private userId: number;
  private isDataLoaded: boolean = false;
  public show: boolean = false;
  public roomreservation = [];
  public roomreservations = [];
  public totalcost = 0;
  public id: number = null;

  @Output() public actionAlertEventEmitter = new EventEmitter();

  constructor(public fb: FormBuilder, private modalService: NgbModal, private apiService: ApiService, private localStorage: LocalStorageService) {
    this.myForm = this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      fechaOne: ['', [Validators.required]],
      fechaTwo: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getLocalStorage();
    this.initializaDate();
    this.getCountries();
  }

  public getLocalStorage() {
    this.localStorage.getItem('id').subscribe(storedId => {
      if (storedId) {
        this.isDataLoaded = true;
        this.userId = storedId;
        this.getRoomReservations();
      }
    });
  }

  getHabitacion(id: number) {
  }

  showTable() {
    this.show = true;
  }

  getHabitacions() {
  }

  getCountries() {
    const requestURL = "locations/countries/";
    this.apiService.getUrl(requestURL).then(
      response => {
        this.countries = response;
      },
      error => {
        if (error.status === 0) {
          this.showErrorAlert("Error obteniendo paises");
        } else {
          this.showErrorAlert(error.error);
        }
      }
    );
  }

  getCities() {
    const requestURL = "locations/countries/" + this.myForm.value.country + "/cities/";
    this.apiService.getUrl(requestURL).then(
      response => {
        this.cities = response;
      },
      error => {
        if (error.status === 0) {
          this.showErrorAlert("Error obteniendo ciudades");
        } else {
          this.showErrorAlert(error.error);
        }
      }
    );
  }

  getHotelsByCity() {
    console.log("Touched");
    this.markAllAsTouched();
    const reservation = this.myForm.value;
    const datesAreValid = this.compararFechas(reservation.fechaOne, reservation.fechaTwo);
    if (this.myForm.valid && datesAreValid) {
      const requestURL = "hotels/?location=" + this.myForm.value.city;
      this.apiService.getUrl(requestURL).then(
        response => {
          console.log(response);
          this.hotels = response;
          this.showTable();
        },
        error => {
          if (error.status === 0) {
            this.showErrorAlert("Error obteniendo hoteles");
          } else {
            this.showErrorAlert(error.error);
          }
        }
      );
    } else {
      this.showErrorAlert("Las fechas no son válidas.");
    }
  }

  public markAllAsTouched() {
    this.myForm.get('country').markAsTouched();
    this.myForm.get('city').markAsTouched();
    this.myForm.get('fechaOne').markAsTouched();
    this.myForm.get('fechaTwo').markAsTouched();
  }

  submit(hotel: any) {
    this.markAllAsTouched();
    const reservation = this.myForm.value;
    let fechas = this.compararFechas(new Date(reservation.fechaOne), new Date(reservation.fechaTwo));

    reservation.checkIn = moment(reservation.fechaOne).format('MM-DD-YYYY HH:mm:ss');
    reservation.checkOut = moment(reservation.fechaTwo).format('MM-DD-YYYY HH:mm:ss');
    var fk_user = this.userId;
    reservation.userId = fk_user
    reservation.hotelId = hotel.id;
    reservation.id = 0;
    delete reservation.city;
    delete reservation.fechaOne;
    delete reservation.fechaTwo;
    delete reservation.country;
    if (this.myForm.valid) {
      this.apiService.postUrl('reservationrooms', reservation).then(
        response => {
          this.getRoomReservations();
          this.getHotelsByCity();
          this.showSuccessMessage("Se ha agregado la reservacion satisfactoriamente.");
        }, error => {
          if (error.status === 0) {
            this.showErrorAlert("Error creando reservación.");
          } else {
            this.showErrorAlert(error.error);
          }
        }
      );
    }

    /*
            if (fechas === 1) {



                if (this.myForm.valid) {
                    this.apiService.postUrl('reservationrooms', reservation).then(
                        response => {
                            console.log(response);
                        }, error => {
                            console.log(error);
                        }
                    );
                }
            } else {
                console.log('La fecha de llegada no puede ser anterior a la de salida.');
            }*/
  }

  buscador() {
    let payload = this.myForm.value;
    if (this.myForm.valid) {
      this.getHabitacions();
    }
  }

  initializaDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var de = '' + dd
    var me = '' + mm
    if (dd < 10) {
      de = '0' + dd
    }
    if (mm < 10) {
      var me = '0' + mm
    }

    var todaye = yyyy + '-' + me + '-' + de;
    document.getElementById("datefieldAlq").setAttribute("min", todaye);
    document.getElementById("datefieldDev").setAttribute("min", todaye);
  }

  open(content, id: number) {
    this.getHabitacion(id);
    this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  public messageAlert(event: Object) {
    this.actionAlertEventEmitter.emit(event);
  }

  public openModalActions(event, data: Object, type: string, deleted?: boolean) {
    event.preventDefault();
    let config: SweetAlertOptions = {
      title: '¿' + (deleted ? 'Desea eliminar el ' : 'Desea cambiar el status del ') + type + '?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      type: 'question',
      focusCancel: true
    }
    Swal.fire(config).then(result => {
      this.messageAlert(data);
    })
  }

  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
  }

  public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
  }

  getRoomReservations() {
    var user_id = this.userId;
    // const requestURL = "reservationrooms/?user="+user_id;
    const requestURL = "reservationrooms/?user=" + user_id;
    this.apiService.getUrl(requestURL).then(
      response => {
        this.roomreservations = response;

        this.roomreservations.forEach(reservation => {
          this.getHotelForReservation(reservation);
        });
      },
      error => {
        if (error.status === 0) {
          this.showErrorAlert("Error obteniendo las reservaciones");
        } else {
          this.showErrorAlert(error.error);
        }
      }
    );
  }

  getDaysFrom2Dates(date1: any, date2: any, price: number) {
    const parseDate1 = new Date(date1);
    const parseDate2 = new Date(date2);
    this.totalcost = (parseDate2.getDate() - parseDate1.getDate());
    this.totalcost = Math.round(this.totalcost);
    this.totalcost = price * this.totalcost;
  }

  public updateRoomReservation(hotel: any, id: number) {
    const requestURL = 'reservationrooms';
    const reservation = this.myForm.value;
    reservation.checkIn = moment(reservation.fechaOne).format('MM-DD-YYYY HH:mm:ss');
    reservation.checkOut = moment(reservation.fechaTwo).format('MM-DD-YYYY HH:mm:ss');
    reservation.userId = this.userId;
    reservation.hotelId = hotel.id;
    reservation.id = id;
    const datesAreValid = this.compararFechas(reservation.fechaOne, reservation.fechaTwo);
    delete reservation.city;
    delete reservation.fechaOne;
    delete reservation.fechaTwo;
    delete reservation.country;
    if (datesAreValid) {
      this.apiService.putUrl(requestURL, reservation).then(
        response => {
          this.getRoomReservations();
          this.showSuccessMessage("Se ha actualizado la reservación satisfactoriamente.")
        }, error => {
          if (error.status === 0) {
            this.showErrorAlert("Error actualizando la reservación");
          } else {
            this.showErrorAlert(error.error);
          }
        }
      );
    } else {
      this.showErrorAlert("Las fechas no son válidas.");
    }
  }

  public deleteRoomReservation(id: number) {
    const requestURL = `reservationrooms/${id}`;
    this.apiService.deleteUrl(requestURL).then(
      response => {
        this.getRoomReservations();
        this.showSuccessMessage("Se ha eliminado la reservación satisfactoriamente");
      }, error => {
        if (error.status === 0) {
          this.showErrorAlert("Error eliminando la reservación");
        } else {
          this.showErrorAlert(error.error);
        }
      }
    );
  }

  openRoom(content, id: number) {
    this.getRoomReservation(id);

    this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getRoomReservation(id: number) {
    const requestURL = `reservationrooms/${id}`;
    this.apiService.getUrl(requestURL).then(
      response => {
        this.id = response.id;
        this.roomreservation = response;
        this.getHotelForReservation(this.roomreservation);
      },
      error => {
        if (error.status === 0) {
          this.showErrorAlert("Error obteniendo la reservación");
        } else {
          this.showErrorAlert(error.error);
        }
      }
    );
  }

  getHotelForReservation(reservation) {
    const requestURL = `hotels/${reservation.hotelId}`;
    this.apiService.getUrl(requestURL).then(response => {
      reservation.hotel = response;
    }, error => {
      if (error.status === 0) {
        this.showErrorAlert("Error obteniendo hotel para reservaciones");
      } else {
        this.showErrorAlert(error.error);
      }
    });
  }

  private showSuccessMessage(title: string) {
    let config: SweetAlertOptions = {
      title: title,
      type: 'success',
      showConfirmButton: false,
      timer: 1800
    }
    Swal.fire(config);
  }

  private showErrorAlert(error: string) {
    let config: SweetAlertOptions = {
      title: error,
      type: 'error',
      showConfirmButton: false,
      timer: 1800
    }
    Swal.fire(config);
  }

  private compararFechas(fecha1str: Date, fecha2str: Date): boolean {
    const fecha1 = new Date(fecha1str);
    fecha1.setDate(fecha1.getDate() + 1);
    const fecha2 = new Date(fecha2str);
    fecha2.setDate(fecha2.getDate() + 1);
    return ((fecha1 < fecha2) && (fecha1 >= new Date()));
  }
}
