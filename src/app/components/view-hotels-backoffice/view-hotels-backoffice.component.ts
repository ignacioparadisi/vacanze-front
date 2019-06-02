import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
//import { Role } from '../../classes/role';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { environment as url } from '../../../environments/environment';
//tabla responsive reutilizable
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";


@Component({
  selector: 'app-view-hotels-backoffice',
  templateUrl: './view-hotels-backoffice.component.html',
  styleUrls: ['./view-hotels-backoffice.component.scss']
})


export class ViewHotelsBackofficeComponent implements OnInit {

  private tableHotelsHeader: Array<String>;
  private tableData: Array<Object>;
  private headerTitle: string;

  //para saber en que ruta se encuentra
  public isEditingHotel: boolean;
  public isCreatingHotel: boolean;


  ngOnChanges(){
  }

  ngOnInit() {
  }

  constructor(private router: Router, private service: ApiService) {
    this.headerTitle = "Lista de hoteles";
    this.tableHotelsHeader = ["#","Nombre","Habitaciones","Teléfono","Sitio Web","Estatus"];
    this.loadHotels();
  }


  public getAlertAction(action: Object) {
    if(action['delete']){
      //console.log(action);
      this.deleteHotel(action['id']);
    }else{
      console.log("se quiere actualizar el estatus del hotel ",action);
      this.changeHotelStatus(action);
    }
  }


  public getCurrentRoute(route){
    if(route === '/agregar-hotel'){
      this.isEditingHotel = true;
      this.isCreatingHotel = false;
      this.router.navigate(['administrar-hoteles','agregar-hotel']);
    }
    else if (route === '/editar-hotel'){
      this.isCreatingHotel = true;
      this.isEditingHotel = false;
      this.router.navigate(['administrar-hoteles','editar-hotel']);
    }
    else{
      this.isCreatingHotel = false;
      this.isEditingHotel = false;
    }
  }



  public getDeactivatedComponent(component){
    this.getCurrentRoute('/administrar-hoteles');
  }



  public loadHotels(){
        this.service
        .getUrl(url.endpoint.default._get.getHotel)
        .then(response => {
              //console.log("Cargan los hoteles", response),
              this.tableData = response
        }).catch( error => {
              console.log("Error carga inicial de hoteles", error);
        });
  }



  public deleteHotel(id: number){
        console.log("se esta borrando el hotel ",id);
        this.service
        .deleteUrl(url.endpoint.default._delete.deleteHotel, [id.toString()])
        .then(response =>{
              //console.log("Respuesta al borrar hotel",response.status),
              //no hay excepcion pero el status no es 200
              this.alertStatus(response.status, true)
        }).catch( error => {
              console.log("Error en el delete del hotel", error)
        });
  }

  public changeHotelStatus(hotel: any){
        this.service
        .putUrl(url.endpoint.default._put.putHotel, hotel, [hotel.id.toString()])
        .then(response => {
              console.log("Exito al modificar ",hotel.id),
              this.alertStatus(response.status, false)
        }).catch( error => {
              console.log("Error actualizando el estatus del hotel")
        });
  }


  private alertStatus(statusCode: number, deleted: boolean){
        let config: SweetAlertOptions = {
          title: (statusCode!=200 ? 'Se ha producido un error': (deleted ? 'Hotel eliminado': 'Se cambió el estatus del hotel')),
          type:  (statusCode==200 ? 'success' : 'error'),
          showConfirmButton: true
        }
        Swal.fire(config).then( result =>{
          this.loadHotels();
        });
  }


  public getHotels(){
    return this.tableData;
  }

  public getHeaderHotels(){
    return this.tableHotelsHeader;
  }

  public getHeaderTitle(){
    return this.headerTitle;
  }

}