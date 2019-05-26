import { Component, Input, Output, OnChanges, EventEmitter, OnInit, ViewChild} from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { RegisterRestaurantComponent } from 'src/app/components/register-restaurant/register-restaurant.component';
import { EditRestaurantComponent } from 'src/app/components/edit-restaurant/edit-restaurant.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss']
})

export class TableResponsiveComponent implements OnChanges{

    @ViewChild('restauranteModal') restauranteModal: RegisterRestaurantComponent;
    @Input() headerTitle: string; // Nombre de la tabla ej: Listado de registros
    @Input() tableData: Array<Object>; // Array con la data a mostrar en cada fila de la tabla
    @Input() tableHeaders: Array<String>; // Array con los nombres de cada columna en la tabla
    @Input() type: string;

    @Output() public actionAlertEventEmitter = new EventEmitter();
    @Output() public emitRouting = new EventEmitter();


    constructor(private router: Router, private modalService: NgbModal){ // Agregando tooltip en boton de agregar
    }



    ngOnChanges(){
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

    /*******************************************************************
    * Metodo para redireccionar a la vista de habitaciones del crucero *
    ********************************************************************/
    public goToBoatRooms(){
      this.emitRouting.emit('/habitaciones');
    }


    /**********************************************************************
    * Metodo para redireccionar a la vista para agregar un hotel          *
    ************************************************************************/
    public goToAddHotel(){
      this.emitRouting.emit('/agregar-hotel');
    }


    /**********************************************************************
    * Metodo que es llamado por el boton añadir                           *
    ***********************************************************************/
    public goToEditHotel(){
      this.emitRouting.emit('/editar-hotel');
    }

    /**********************************************************************
    * Metodo que es llamado por el boton añadir                           *
    ***********************************************************************/
    public gotoAdd(type: string){
      if (type === 'hotel'){
        this.goToAddHotel();
      } else if (type === 'restaurantes') {
        const modalRef = this.modalService.open(RegisterRestaurantComponent);
      }
    }


    /**********************************************************************
    * Metodo que es llamado por el boton añadir                           *
    ***********************************************************************/
    public goToEdit(type: string){
      if (type === 'hotel'){
        this.goToEditHotel();
      }
    }


    RegisterRestaurantModal() {
      const modalRef = this.modalService.open(RegisterRestaurantComponent);
    }

    EditRestaurantModal() {
      const modalRef = this.modalService.open(EditRestaurantComponent);
    }

}
