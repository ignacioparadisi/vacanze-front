import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { compararFechas } from '../../utils/global_functions';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
    selector: 'mis-reservas',
    templateUrl: './mis-reservas.html',
   // styleUrls: ['./mis-reservas.scss'],
    providers: [ApiService]
})
export class MisReservas implements OnInit {
    myForm: FormGroup;
    public _id:number;
    public carreservations ="";
    public roomreservations="";
    public closeResult: string;
    public flightReservations=[];

    @Output() public actionAlertEventEmitter = new EventEmitter();

    constructor(public fb: FormBuilder, private modalService: NgbModal, private apiService: ApiService,private router: Router) {
        this.myForm = this.fb.group({
        });
    }

    ngOnInit() {
     // this.getAutomobileReservations();
     this.getRoomReservations();
     this.getFlightReservations(this._id);
    }

     /**************************************************************************
  * Metodo para enviar la confirmación de la alerta                         *
  **************************************************************************/
  public messageAlert(event: Object){
    this.actionAlertEventEmitter.emit(event);
  }

      /************************************************************************
  * Metodo para lanzar la alerta de confirmacion , de eliminacion o estatus*
  **************************************************************************/
  public openModalActions(event, data: Object, type: string, deleted? : boolean){
    event.preventDefault();
    let config: SweetAlertOptions = {
      title: '¿' + (deleted ? 'Desea eliminar la reservacion de ':'Desea cambiar el status del ') + type + '?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      type: 'question',
      focusCancel: true
    }
    Swal.fire(config).then(result => {
      data['delete'] = deleted;
      if(result && ('value' in result)){
        data['confirmed'] = true;
        this.deleteFlightReservation(this._id);
       
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
   public goToEdit(type: string){

  }

  /**********************************************************************
    * Metodo que es llamado para mostrar las reservas de ese usuario                          *
    ***********************************************************************/
  getAutomobileReservations(){
    console.log("Estoy en getAutomobileReservations");
    const requestURL = "reservationautomobiles/?user=1";
    this.apiService.getUrl(requestURL).then(
        response => {
          console.log(response);
            this.carreservations = response;
        },
        error => {
            console.log(error);
        }
    );
}

getRoomReservations(){
  console.log("Estoy en getRoomReservations");
  const requestURL = "reservationrooms/?user=1";
  this.apiService.getUrl(requestURL).then(
      response => {
        console.log(response);
          this.roomreservations = response;
      },
      error => {
          console.log(error);
      }
  );
}

public deleteAutomobileReservation(id: number) {
  const requestURL = `reservationautomobiles/${id}`;
  this.apiService.deleteUrl(requestURL).then(
    response => {
      console.log(response);
      this.getAutomobileReservations();
      console.log('Reservacion con el id=' + id + 'fue eliminada');
    }, error => {
      console.error(error);
      this.getAutomobileReservations();
    }
  );
}

public deleteRoomReservation(id: number) {
  const requestURL = `reservationrooms/${id}`;
  this.apiService.deleteUrl(requestURL).then(
    response => {
      console.log(response);
      this.getRoomReservations()
      console.log('Reservacion con el id=' + id + 'fue eliminada');
    }, error => {
      console.error(error);
      this.getRoomReservations();
    }
  );
}
//metodo para recibir reservas de vuelo
getFlightReservations(id:number){
  console.log("Estoy en getFlightReservations");
  console.log("ID"+id);

  const requestURL = `list-reservation-flight/${id}`;  
  this.apiService.getUrl(requestURL).then(
      response => {
        console.log("mylistreeees:",response);
          this.flightReservations = response;
      },
      error => {
          console.log(error);
      }
  );
}
//metodo para eliminar reservas de vuelo
 deleteFlightReservation(id: number) {
   console.log("id tiene:",id);
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
}