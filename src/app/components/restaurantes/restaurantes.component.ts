import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../classes/role';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertOptions } from 'sweetalert2';
import { environment as url } from '../../../environments/environment';
import { TableResponsiveComponent } from '../../blocks/table-responsive/table-responsive.component';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {

  private tableRestaurantesHeader: Array<String>;
  private tableData: Array<Object>;
  private headerTitle: string;

  // configuraciones de los sweetalert
  private deleteAlertConfiguration: SweetAlertOptions;

  // la accion que le llega de actionalerter para ejecutar sobre un registro
  public actionAlert: string;

  ngOnInit() {
  }

  constructor(private router: Router, private service: ApiService) {
    this.headerTitle = 'Lista de Restaurantes';
    this.tableRestaurantesHeader = this.getTableHeaders();
    this.loadRestaurants();
  }

  public getAlertAction(action: string) {
    this.actionAlert = action;
    console.log(this.actionAlert);
  }


  private getExampleData() {
    return [
      {
        id : 1,
        name: 'Mc Donalds',
        business: 'Mc Donalds',
        qualify: 4.5,
        price: 12,
        capacity: 5988,
        typeFood: 'Rapida',
        status: 'Active'
      },
      {
        id : 2,
        name: 'Wendys',
        business: 'Wendys',
        qualify: 3.5,
        price: 9,
        capacity: 5260,
        typeFood: 'Rapida',
        status: 'Active'
      },
      {
        id : 3,
        name: 'Burger King',
        business: 'Burger',
        qualify: 4,
        price: 10,
        capacity: 1123,
        typeFood: 'Rapida',
        status: 'Inactive'
      },
    ];
  }

  private getTableHeaders() {
    return [
      '#',
      'Nombre',
      'Capacidad',
      'Calificación',
      'Especialidad',
      'Precio',
      'Razon Social',
      'Descripcion',
      'Telefono',
      'Direccion',
      'Status'
    ];
  }


  public loadRestaurants(){
    this.service
    .getUrl(url.endpoint.default._get.getRestaurant)
    .then(response => {
          this.tableData = response,
          console.log(response)
    }).catch( error => {
          console.log('Error carga inicial de restaurantes', error);
    });
}

  public getRestaurants() {
    return this.tableData;
  }

  public getHeaderHotels() {
    return this.tableRestaurantesHeader;
  }

  public getHeaderTitle() {
    return this.headerTitle;
  }

  public getDeleteAlertConfiguration() {
    return this.deleteAlertConfiguration;
  }

}
