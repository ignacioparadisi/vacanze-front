import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { compararFechas } from '../../utils/global_functions';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Timestamp } from 'rxjs';
import { environment as url } from '../../../environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';
import { Location } from "@angular/common";

@Component({
  selector: 'mis-reservas',
  templateUrl: './mis-reservas.html',
  // styleUrls: ['./mis-reservas.scss'],
  providers: [ApiService]
})
export class MisReservas implements OnInit {
  myForm: FormGroup;

  public compararFechas: any;
  public carreservations = "";
  public roomreservations = "";
  public closeResult: string;
  public id: number = null;
  public totalcost: number = null;
  public roomreservation = [];
  public carreservation = [];

  //Variables de restaurantes
  private headerTitle: string;
  private tableRestaurantReservationHeader: Array<String>;
  private tableData: Array<Object>;
  public userId: number
  public isDataLoaded: boolean
  public flightReservations = [];

  @Output() public actionAlertEventEmitter = new EventEmitter();

  constructor(public fb: FormBuilder,
    private modalService: NgbModal,
    private apiService: ApiService,
    private _location: Location,
    private localStorage: LocalStorageService,
    private router: Router) {

    this.compararFechas = compararFechas;
    this.myForm = this.fb.group({
      fechaOne: ['', [Validators.required]],
      fechaTwo: ['', [Validators.required]]
    });
    this.headerTitle = "Reservas de restaurant.";
    this.tableRestaurantReservationHeader = [
      "Restaurante",
      "Dirección",
      "Comensales",
      "Fecha reservada",
      "Ubicación",
      ""
    ]
  }

  ngOnInit() {
    // this.getAutomobileReservations();
    this.getRoomReservations();
    this.getLocalStorage();
    this.getLocalStorageRes();
  }

  public getLocalStorage() {
    this.localStorage.getItem('id').subscribe(storedId => {
      if (storedId) {
        this.isDataLoaded = true;
        this.userId = storedId;
        this.getAutomobileReservations();
        this.getRoomReservations();
      }
    });
  }

  /**************************************************************************
* Metodo para enviar la confirmación de la alerta                         *
**************************************************************************/
  public messageAlert(event: Object) {
    this.actionAlertEventEmitter.emit(event);
  }

  /************************************************************************
* Metodo para lanzar la alerta de confirmacion , de eliminacion o estatus*
**************************************************************************/
  public openModalActions(event, data: Object, type: string, deleted?: boolean) {
    event.preventDefault();
    let config: SweetAlertOptions = {
      title: '¿' + (deleted ? 'Desea eliminar la reservacion de ' : 'Desea cambiar el status del ') + type + '?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      type: 'question',
      focusCancel: true
    }
    Swal.fire(config).then(result => {
      data['delete'] = deleted;
      if (result && ('value' in result)) {
        data['confirmed'] = true;
      }
      else {
        data['confirmed'] = false;
      }
      this.messageAlert(data);

    })
  }

  /**********************************************************************
  * Metodo que es llamado por el boton editar                           *
  ***********************************************************************/
  public goToEdit(type: string) {

  }

  /**********************************************************************
    * Metodo que es llamado para mostrar las reservas de ese usuario                          *
    ***********************************************************************/
  getAutomobileReservations() {
    var user_id = this.userId;
    //  const requestURL = "reservationautomobiles/?user="+user_id;
    const requestURL = "reservationautomobiles/?user=" + this.userId; //Mientras se soluciona el peo
    this.apiService.getUrl(requestURL).then(
      response => {
        this.carreservations = response;
      },
      error => {
      }
    );
  }

  getRoomReservations() {
    var user_id = this.userId;
    // const requestURL = "reservationrooms/?user="+user_id;
    const requestURL = "reservationrooms/?user=" + user_id;
    this.apiService.getUrl(requestURL).then(
      response => {
        this.roomreservations = response;
      },
      error => {
      }
    );
  }

  public deleteAutomobileReservation(id: number) {
    const requestURL = `reservationautomobiles/${id}`;
    this.apiService.deleteUrl(requestURL).then(
      response => {
        this.getAutomobileReservations();
      }, error => {
        this.getAutomobileReservations();
      }
    );
  }

  public deleteRoomReservation(id: number) {
    const requestURL = `reservationrooms/${id}`;
    this.apiService.deleteUrl(requestURL).then(
      response => {
        this.getRoomReservations()
      }, error => {
        console.error(error);
        this.getRoomReservations();
      }
    );
  }
  ////////metodo para reserva de vuelos modal
  public openModalFlight(id: number) {

    Swal.fire({
      title: 'Estas seguro?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.deleteFlightReservation(id);
        Swal.fire(
          'Eliminado exitosamente!!',
        )
        this.ngOnInit();
      }
    })

  }
  //metodo para recibir reservas de vuelo
  getFlightReservations() {
    console.log("Estoy en getFlightReservations");
    console.log("ID" + this.userId);

    const requestURL = `list-reservation-flight/${this.userId}`;
    this.apiService.getUrl(requestURL).then(
      response => {
        this.flightReservations = response;
        console.log("mylistreeees:", response);
        //this.flightReservations = response;
      },
      error => {
        console.log(error);
      }
    );
  }
  //metodo para eliminar reservas de vuelo
  deleteFlightReservation(id: number) {
    console.log("id tiene:", this.userId);
    const requestURL = `delete-reservation-flight/${id}`;
    this.apiService.deleteUrl(requestURL).then(
      response => {
        console.log(response);
        console.log('Reservacion con el id' + id + 'fue eliminada');
      }, error => {
        console.error(error);
      }
    );
  }

  public updateAutomobileReservation(car: object, id: number) {
    const requestURL = 'reservationautomobiles';
    const reservation = this.myForm.value;
    var fk_user = this.userId;
    reservation.checkIn = moment(reservation.fechaOne).format('MM-DD-YYYY HH:mm:ss');
    reservation.checkOut = moment(reservation.fechaTwo).format('MM-DD-YYYY HH:mm:ss');
    reservation.fk_user = fk_user;
    reservation.automobile = car;
    //  reservation.user="";
    reservation.id = id;
    const fechas = this.compararFechas(new Date(reservation.fechaOne), new Date(reservation.fechaTwo));
    delete reservation.city;
    delete reservation.fechaOne;
    delete reservation.fechaTwo;
    delete reservation.country;
    if (fechas === 1) {
      this.apiService.putUrl(requestURL, reservation).then(
        response => {
          this.getAutomobileReservations();
        }, error => {
          console.error(error);
          this.getAutomobileReservations();
        }
      );
    }
  }

  public updateRoomReservation(hotel: object, id: number) {
    const requestURL = 'reservationrooms';
    const reservation = this.myForm.value;
    var fk_user = this.userId;
    reservation.checkIn = moment(reservation.fechaOne).format('MM-DD-YYYY HH:mm:ss');
    reservation.checkOut = moment(reservation.fechaTwo).format('MM-DD-YYYY HH:mm:ss');
    reservation.fk_user = fk_user;
    reservation.hotel = hotel;
    reservation.user = "";
    reservation.id = id;
    const fechas = this.compararFechas(new Date(reservation.fechaOne), new Date(reservation.fechaTwo));
    delete reservation.city;
    delete reservation.fechaOne;
    delete reservation.fechaTwo;
    delete reservation.country;
    if (fechas === 1)
      this.apiService.putUrl(requestURL, reservation).then(
        response => {
          this.getRoomReservations();
        }, error => {
          console.error(error);
          this.getRoomReservations();
        }
      );
  }

  getRoomReservation(id: number) {
    const requestURL = `reservationrooms/${id}`;
    this.apiService.getUrl(requestURL).then(
      response => {
        this.id = response.id;
        this.roomreservation = response;
      },
      error => {
      }
    );
  }

  getCarReservation(id: number) {
    const requestURL = `reservationautomobiles/${id}`;
    this.apiService.getUrl(requestURL).then(
      response => {
        this.id = response.id;
        this.carreservation = response;
      },
      error => {
      }
    );
  }

  getDaysFrom2Dates(date1: any, date2: any, price: number) {

    var parseDate1 = new Date(date1);
    var parseDate2 = new Date(date2);
    this.totalcost = (parseDate2.getDate() - parseDate1.getDate());
    this.totalcost = Math.round(this.totalcost);
    this.totalcost = price * this.totalcost;
  }

  openRoom(content, id: number) {
    this.getRoomReservation(id);

    this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCar(content, id: number) {
    this.getCarReservation(id);

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

  initializaDate() {
    var today = new Date();
    var dd = today.getDate() + 1;
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

  //Funciones para restaurantes

  // METODO PARA ACCEDER AL LOCAL STORAGE
  public getLocalStorageRes() {
    this.localStorage.getItem('id').subscribe(storedId => {
      if (storedId) {
        this.isDataLoaded = true
        this.userId = storedId
        this.getRestaurantReservation()
        this.getFlightReservations()
      }
    })
  }

  public getRestaurantReservation() {
    this.apiService
      .getUrl(url.endpoint.default._get.getResRestaurantById, [this.userId.toString()])
      .then(response => {
        this.tableData = response;
      }, error => console.error(error));
  }

  public getAlertAction(reserva: Object) {
    if (reserva['confirmed']) {
      if (reserva['delete']) {
        this.deleteReservation(reserva['id']);
      }
    }
  }

  public deleteReservation(id: number) {
    this.apiService
      .deleteUrl(url.endpoint.default._delete.deleteResRestaurant, [id.toString()])
      .then(response => {

        this.alertStatus(200, true)
      }).catch(error => {
        this.alertStatus(500, false);
      });
  }

  private alertStatus(statusCode: number, deleted: boolean) {
    let config: SweetAlertOptions = {
      title: (statusCode != 200 ? 'Se ha producido un error' : (deleted ? 'Reservación eliminada' : '')),
      type: (statusCode == 200 ? 'success' : 'error'),
      showConfirmButton: true
    }
    Swal.fire(config).then(result => {
      this.getRestaurantReservation()
    });
  }

  public goBack() {
    this._location.back()
  }

  //FUNCIONES PARA LLENAR LA TABLA TABLE-RESPONSIVE-RESERVAS

  public getRestaurants() {
    return this.tableData;
  }

  public getHeaderRestaurantReservation() {
    return this.tableRestaurantReservationHeader;
  }

  public getHeaderTitle() {
    return this.headerTitle;
  }

}
