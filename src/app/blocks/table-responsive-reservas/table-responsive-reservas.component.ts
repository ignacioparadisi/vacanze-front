import { Component, Input, Output, OnChanges, EventEmitter, OnInit, ViewChild } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { environment as url } from '../../../environments/environment';
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

  public isDataLoaded: boolean = false //Variable para saber si se cargaron los datos del LocalStorage
  public formData //Variable a la cual le asigno los datos que me traje del formulario

  constructor(private api: ApiService,
    private router: Router, 
    private modalService: NgbModal, 
    private localStorage: LocalStorageService) { 
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
    title: '¿' + (deleted ? 'Desea eliminar la reserva del restaurante ':'Desea cambiar el status del ') + data['restaurantName'] + '?',
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
  * Metodo para redireccionar a la vista de añadir listar el 
  * restaurant que quiere reservar *
  *************************************************************/
  public goToDetailView(reserva: Object){
    
    this.localStorage.getItem('formReserva').subscribe(storedRes =>{
      if(storedRes){
        this.isDataLoaded = true
        this.formData = storedRes
      }
    })
    
    if(this.isDataLoaded === true){
      var datos ={
        reservation: reserva,
        userDatos: this.formData
      }
      //Significa que el usuario hizo todos los pasos para llegar a la ventana
      this.localStorage.setItem('resRestaurant', datos).subscribe(datos =>{
        this.router.navigate(['restaurant-reservation/list-restaurant/detail-view']);      
      })
    }
  }
  
}