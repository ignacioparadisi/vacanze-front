import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../classes/role';
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

  //la accion que le llega de table-responsive
  public actionAlert: string;

  //para saber en que ruta se encuentra
  public isEditingHotel: boolean;
  public isCreatingHotel: boolean;


  ngOnInit() {
  }

  constructor(private router: Router, private service: ApiService) {
    this.headerTitle = "Lista de hoteles";
    this.tableHotelsHeader = ["#","Nombre","Habitaciones","Teléfono","Sitio Web","Estatus"];
    this.loadHotels();
  }


  public getAlertAction(action: string) {
    this.actionAlert = action;
    console.log(this.actionAlert);
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
              this.tableData = response,
              console.log(response)
        }).catch( error => {
              console.log("Error carga inicial de hoteles", error);
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
