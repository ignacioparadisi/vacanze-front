import { Component, Input, Output, OnChanges, EventEmitter, OnInit} from '@angular/core';
import { ActionAlerterComponent } from '../action-alerter/action-alerter.component';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss']
})

export class TableResponsiveComponent implements OnChanges{

    @Input() headerTitle: string; // Nombre de la tabla ej: Listado de registros
    @Input() tableData: Array<Object>; // Array con la data a mostrar en cada fila de la tabla
    @Input() tableHeaders: Array<String>; // Array con los nombres de cada columna en la tabla
    @Input() type: string;

    //para la configuracion de la alerta
    //esta configuracion no se puede cambiar y debe ser individual
    @Input() deleteAlertConfiguration: SweetAlertOptions = {};

    //generico de la interaccion con el alert
    @Output() public actionAlertEventEmitter = new EventEmitter();

    constructor(){ // Agregando tooltip en boton de agregar
    }

    ngOnChanges(){
      if(this.tableData.length !== 0){
        this.tableData.forEach(b => {
          if(b['status'] === 'Active'){
            b['active'] = true;
          }
          else {
            b['active'] = false;  
          }
        })  
      }
    }

    public messageAlert(event: Object){
      this.actionAlertEventEmitter.emit(event);
    }

    public openModalActions(action, boat?: Object){
      action.preventDefault();
      let config: SweetAlertOptions = {
        title: '',
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        type: 'question',
        focusCancel: true  
      }

      if(boat){
        boat['status'] === 'Active' ? config.title = 'Desea desactivar el crucero?' : config.title = 'Desea activar el crucero?';
      }
      else {
        config.title = 'Desea eliminar el crucero?';
      }

      Swal.fire(config).then(result => {
        console.log("Aqui se maneja el result", result);
      })
    }
}
