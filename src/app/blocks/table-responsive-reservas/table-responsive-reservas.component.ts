import { Component, Input, Output, OnChanges, EventEmitter, OnInit, ViewChild } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-responsive-reservas',
  templateUrl: './table-responsive-reservas.component.html',
  styleUrls: ['./table-responsive-reservas.component.scss']
})

export class TableResponsiveReservasComponent implements OnChanges {

  @Input() headerTitle: string; // Nombre de la tabla ej: Listado de registros
  @Input() tableData: Array<Object>; // Array con la data a mostrar en cada fila de la tabla
  @Input() tableHeaders: Array<String>; // Array con los nombres de cada columna en la tabla
  @Input() type: string;

  @Output() public actionAlertEventEmitter = new EventEmitter();
  @Output() public emitRouting = new EventEmitter();

  constructor(private router: Router, private modalService: NgbModal) { // Agregando tooltip en boton de agregar
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
    public openModalActions(event, data: Object, type: string, deleted? : boolean){
      event.preventDefault();
      let config: SweetAlertOptions = {
        title: '¿' + (deleted ? 'Desea eliminar el ':'Desea cambiar el status del ') + type + '?',
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
}
