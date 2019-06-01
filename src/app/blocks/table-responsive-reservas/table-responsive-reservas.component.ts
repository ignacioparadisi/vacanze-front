import { Component, Input, Output, OnChanges, EventEmitter, OnInit, ViewChild } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';

//** Import de components **//
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-table-responsive-reservas',
  templateUrl: './table-responsive-reservas.component.html',
  styleUrls: ['./table-responsive-reservas.component.scss'],
  providers: [ ApiService ]
})

export class TableResponsiveReservasComponent implements OnChanges {

  @Input() headerTitle: string; // Nombre de la tabla ej: Listado de registros
  @Input() tableData: Array<Object>; // Array con la data a mostrar en cada fila de la tabla
  @Input() tableHeaders: Array<String>; // Array con los nombres de cada columna en la tabla
  @Input() type: string;

  @Output() public actionAlertEventEmitter = new EventEmitter();
  @Output() public emitRouting = new EventEmitter();

  constructor(private router: Router, private modalService: NgbModal, private localStorage: LocalStorageService) { // Agregando tooltip en boton de agregar
  }
 
  ngOnChanges(){
      if(this.tableData!= null){
        if(this.tableData.length !== 0){
          this.tableData.forEach(b => {
            if(b['status'] === 'Active') {
              b['active'] = true;
            }
            else {
              b['active'] = false;
            }
          })
        }
     }
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
  public openModalActions(event, data: Object, type: string, resgister? : boolean){
    event.preventDefault();
    let config: SweetAlertOptions = {
      title: '¿' + (resgister ? 'Desea '+ type +' una mesa del restaurant ':'Desea cambiar el status del ') + data + '?',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        showCancelButton: true,
        type: 'question',
        focusCancel: true
    }
    Swal.fire(config).then(result => {
      this.messageAlert(data);
    })
  }

    /************************************************************
    * Metodo para redireccionar a la vista de añadir listar el 
    * restaurant que quiere reservar *
    *************************************************************/
  public goToDetailView(){
    console.log('estoy en el detail view')
    this.emitRouting.emit('restaurant-reservation/list-restaurant/detail-view')
    //this.router.navigate(['restaurant-reservation/list-restaurant/detail-view']);
  }
  
}