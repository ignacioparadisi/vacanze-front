import { Component, Input, Output, OnChanges, EventEmitter, OnInit, ViewChild } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//* Import de interfaces *//
import { Cruiser } from '../../interfaces/cruiser';
import { ApiService } from '../../services/api.service';
//** Import de components **//
import { LocalStorageService } from '../../services/local-storage.service';
import { last } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss'],
  providers: [ ApiService ]
})

export class TableResponsiveComponent implements OnChanges {

  /* @ViewChild('restauranteModal') restauranteModal: RegisterRestaurantComponent; */
  @Input() headerTitle: string; // Nombre de la tabla ej: Listado de registros
  @Input() tableData: Array<any>; // Array con la data a mostrar en cada fila de la tabla
  @Input() tableHeaders: Array<String>; // Array con los nombres de cada columna en la tabla
  @Input() type: string;
  public arregloPaginas: number[];
  public filterDatabyPage: any[];
  public actualPage: number;
  public verifyButtons: Object;
  
  @Output() public actionAlertEventEmitter = new EventEmitter();
  @Output() public emitRouting = new EventEmitter();

  constructor(private router: Router, private modalService: NgbModal, private localStorage: LocalStorageService) {
    this.arregloPaginas = [];
    this.filterDatabyPage = [];
    this.actualPage = 1;
    this.verifyButtons = {
      previous: true,
      next: false
    }
  }

  ngOnChanges(){
    
    if(this.tableData){
      if(this.tableData.length !== 0){
        this.arregloPaginas = [];
        this.resizePagination();
        this.tableData.forEach(b => {
          b.status ? b['active'] = true : b['active'] = false;
        })
        this.addObjectsToTable();
        this.changePage(1);
      }
    }

  }

  /**********************************************************************
    * Metodo para cambiar de pagina                         *
  ***********************************************************************/

  public changePage(page){
    let lastPage = Math.ceil(this.tableData.length / 5);
    this.actualPage = page;
    console.log(lastPage);

    if (this.actualPage == lastPage){
      this.verifyButtons['next'] = true;
      this.verifyButtons['previous'] = false;
    } else {
      this.verifyButtons['next'] = false;
    }

    if (this.actualPage == 1){
      this.verifyButtons['previous'] = true;
      this.verifyButtons['next'] = false;
    } else {
      this.verifyButtons['previous'] = false;
    }
    
    let inicio = (page * 5) - 5;
    let fin = page * 5;
    this.filterDatabyPage = [];
    if (fin > this.tableData.length){
      fin = this.tableData.length;
    }
    for (let i = inicio; i < fin; i++){
        this.filterDatabyPage.push(this.tableData[i]);
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

    if(type === 'ruta'){
      let config: SweetAlertOptions = {
        title: '¿ Desea eliminar la ruta del crucero ?',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        type: 'question',
        focusCancel: true
      }
      Swal.fire(config).then(result => {
        if(result && ('value' in result)){
          data['type'] = 'ruta';
          data['confirmed'] = true;
        }
        else {
          data['type'] = 'ruta';
          data['confirmed'] = false;
        }
        this.messageAlert(data);
      })
    }
    else {
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
      else if( type === 'cruceros'){
        this.goToAddCruiser();
      }
    }

    public goToSeeRoutes(boat: Object){
      this.localStorage.setItem('boat', boat).subscribe(data => {
        this.emitRouting.emit(boat['id']+'/rutas');
      })
    }

    public goToAddNewRoute(boat: Object){
      this.localStorage.setItem('boat', boat).subscribe(data => {
        this.emitRouting.emit('/agregar-ruta/'+boat['id']);
      })
    }

    public goToCruiserTable(){
      this.emitRouting.emit('/cruceros');
    }

    public resizePagination(){
      // Se redonde hacia arriba (ceil) ya que el numero nuevo de pagina es menor al actual
      for (let i = 0; i < Math.ceil(this.tableData.length / 5); i++){
        this.arregloPaginas[i] = i + 1;
      }
    }

    public addObjectsToTable(){
      for (let i = 0; i < this.tableData.length; i++){
        if (i <= 4){
          this.filterDatabyPage.push(this.tableData[i]);
        } else {
          break;
        }
      }
    }

}
