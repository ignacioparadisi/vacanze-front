import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { ApiService } from "../../../services/api.service";
import { environment as url } from "../../../../environments/environment";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {

  public headerTitle: string;
  public tableHeaders: Array<string>;
  public routesCruiser: Array<Object>;
  public countries: Array<Object>;

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
    this.getCountry();
    this.localStorage.getItem('boat').subscribe(cruiser => {
      this.localStorage.getItem('cruiserRoutes').subscribe(data => {
        if(data && data.length !== 0){
          this.headerTitle = "Rutas | " +cruiser['name'];
          this.routesCruiser = data;
          this.findLocationsById(this.routesCruiser)
        }
        else {
          this.routesCruiser = [];
          this.localStorage.getItem('boat').subscribe(data =>{
            this.headerTitle = "No hay rutas disponibles para | " + cruiser['name'];
          })  
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

  /*********************************
  * Metodo para obtener los paises *
  **********************************/
  public getCountry() {
    this.api.getUrl(url.endpoint.default._get.getCountry)
      .then(response => {
        this.countries = response;
      })
      .catch(error => {

      })
  }

  public findLocationsById(routes: Array<Object>){
    let aux = [];
    routes.forEach(route => {
      let departure = this.countries.find(country => route['locDeparture'] === country['id']);
      let arrival = this.countries.find(country => route['locArrival'] === country['id']);
      route['locDeparture'] = departure['country'];
      route['locArrival'] = arrival['country'];
      aux.push(route);
    })
    this.routesCruiser = aux;
  }

}
