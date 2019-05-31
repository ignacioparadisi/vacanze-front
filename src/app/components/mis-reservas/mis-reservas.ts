import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { compararFechas } from '../../utils/global_functions';
import * as moment from 'moment';

@Component({
    selector: 'mis-reservas',
    templateUrl: './mis-reservas.html',
    styleUrls: ['./mis-reservas.scss'],
    providers: [ApiService]
})
export class MisReservas implements OnInit {
    myForm: FormGroup;
    public closeResult: string;

    @Output() public actionAlertEventEmitter = new EventEmitter();

    constructor(public fb: FormBuilder, private modalService: NgbModal, private apiService: ApiService) {
        this.myForm = this.fb.group({
        });
    }

    ngOnInit() {
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
}