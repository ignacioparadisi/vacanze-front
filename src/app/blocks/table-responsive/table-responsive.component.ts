import { Component, Input, Output, OnChanges, EventEmitter, OnInit, ViewChild } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//* Import de interfaces *//
import { Cruiser } from '../../interfaces/cruiser';
import { ApiService } from '../../services/api.service';
//** Import de components **//
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss'],
  providers: [ ApiService ]
})

export class TableResponsiveComponent implements OnChanges {

  /* @ViewChild('restauranteModal') restauranteModal: RegisterRestaurantComponent; */
  @Input() headerTitle: string; // Nombre de la tabla ej: Listado de registros
  @Input() tableData: Array<Cruiser>; // Array con la data a mostrar en cada fila de la tabla
  @Input() tableHeaders: Array<String>; // Array con los nombres de cada columna en la tabla
  @Input() type: string;

  @Output() public actionAlertEventEmitter = new EventEmitter();
  @Output() public emitRouting = new EventEmitter();

  constructor(private router: Router, private modalService: NgbModal, private localStorage: LocalStorageService) {
  }

  ngOnChanges(){
    if(this.tableData!= null){
      if(this.tableData.length !== 0){
        this.tableData.forEach(b => {
          b.status ? b['active'] = true : b['active'] = false;
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
    let config: SweetAlertOptions = {
      title: '¿' + (deleted ? 'Desea eliminar el ':'Desea cambiar el status del ') + type + '?',
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

    /************************************************************
    * Metodo para redireccionar a la vista de añadir un crucero *
    *************************************************************/
    public goToAddCruiser(){
      this.emitRouting.emit('/agregar-crucero');
    }

     /************************************************************
    * Metodo para redireccionar a la vista de añadir un crucero *
    *************************************************************/
    public goToEditCruiser(boat: Object){
      this.localStorage.setItem('boat', boat).subscribe(data => {
        this.emitRouting.emit('/editar-crucero/'+boat['id']);
      });
    }

      /************************************************************
    * Metodo para redireccionar a la vista de añadir un restaurante *
    *************************************************************/
   public goToEditRestaurant(restaurant: Object){
    this.localStorage.setItem('restaurant', restaurant).subscribe(data => {
      // console.log(restaurant);
      this.emitRouting.emit('/editar-restaurant/' + restaurant['id']);
    });
  }

    /**********************************************************************
    * Metodo para redireccionar a la vista para agregar un hotel          *
    ************************************************************************/
    public goToAddHotel(){
      this.emitRouting.emit('/agregar-hotel');
    }


    /**********************************************************************
    * Metodo para ir a editar el hotel                                    *
    ***********************************************************************/
    public goToEditHotel(hotel: Object){
      this.localStorage.setItem('hotel',  hotel).subscribe(data =>{
        this.emitRouting.emit('/editar-hotel/' + hotel['id']);
      });
    }

    /**********************************************************************
    * Metodo para redireccionar a la vista para agregar un restaurante    *
    ************************************************************************/
    public goToAddRestaurant() {
      this.emitRouting.emit('/agregar-restaurant');
    }

    /**********************************************************************
    * Metodo que es llamado por el boton añadir                           *
    ***********************************************************************/
    public gotoAdd(type: string){
      if (type === 'hotel'){
        this.goToAddHotel();
      } else if (type === 'restaurantes') {
        this.goToAddRestaurant();
      }
    }


}
