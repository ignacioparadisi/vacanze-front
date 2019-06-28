import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { ApiService } from "../../../services/api.service";
import { environment as url } from "../../../../environments/environment";
import Swal from 'sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {

  public headerTitle: string;
  public tableHeaders: Array<string>;
  public routesCruiser: Array<Object>;
  public locations: Array<Object>;

  constructor(private localStorage: LocalStorageService, private router: Router, private api: ApiService) { 
    this.headerTitle = "";
    this.tableHeaders = [
      "Fecha de salida",
      "Fecha de llegada",
      "Precio",
      "Ubicación de salida",
      "Ubicación de llegada"
    ]
    this.routesCruiser = [];
  }
  
  ngOnInit() {
    this.localStorage.getItem('boat').subscribe(cruiser => {
      this.localStorage.getItem('cruiserRoutes').subscribe(data => {
        if(data && data.length !== 0){
          this.headerTitle = "Rutas | " +cruiser['name'].bold();
          this.routesCruiser = data;
          this.getLocations(this.routesCruiser);
        }
        else {
          this.routesCruiser = [];
          this.headerTitle = "No hay rutas disponibles para | " + cruiser['name'].bold();
        }
      })
    })
  }

  ngOnDestroy(){
    this.localStorage.removeItem('cruiserRoutes');
    this.localStorage.removeItem('boat');
  }

  public getCurrentRoute(route){
    this.router.navigate(['/cruceros']);
  }

  /***********************************
  * Metodo para obtener las ciudades *
  ************************************/
  public getLocations(routes) {
    let aux = [];
    this.api.getUrl(url.endpoint.default._get.getLocations)
      .then(response => {
        this.locations = response;
        routes.forEach(route => {
          let departure = this.locations.find(location => location['id'] === route['locDeparture']);
          route['depCity'] = departure['city'];
          route['depCountry'] = departure['country'];
          let arrival = this.locations.find(location => location['id'] === route['locArrival']);
          route['arrivalCity'] = arrival['city'];
          route['arrivalCountry'] = arrival['country'];
          aux.push(route);
        })
        this.routesCruiser = aux;
      })
      .catch(error => {

      })
  }

  public findLocationsById(routes: Array<Object>){
    let aux = [];
    routes.forEach(route => {
      aux.push(route);
    })
    this.routesCruiser = aux;
  }

  public getDeleteAlert(data){
    if(data['confirmed']){
      this.api.deleteUrl(url.endpoint.default._delete.cruisers.delete_routes, [data['id'].toString()])
        .then(response => {
          this.successfullyResponse(response);
        })
        .catch(error => {
          this.errorOcurred('eliminar');
        })
    }
  }

  private errorOcurred(action: string){
    let config: SweetAlertOptions = {
      title: 'Ha ocurrido un error al ' +action+' la ruta',
      type: 'error',
      showConfirmButton: true,
      timer: 1500
    }
    Swal.fire(config).then( result =>{
    });
  }

  private successfullyResponse(response){
    let config: SweetAlertOptions = {
      title: 'Ruta eliminada',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    }
    Swal.fire(config).then( result => {
      this.routesCruiser = this.routesCruiser.filter(route => route['id'] !== response['id']);
    });
  }
}
