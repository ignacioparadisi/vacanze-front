import { Component, OnInit } from '@angular/core';
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";
import { Router } from '@angular/router';
import { Cruiser } from '../../interfaces/cruiser';
import { ApiService } from '../../services/api.service';
import { environment as url } from '../../../environments/environment';

@Component({
  selector: 'app-grupo-ocho-cruceros',
  templateUrl: './grupo-ocho-cruceros.component.html',
  styleUrls: ['./grupo-ocho-cruceros.component.scss']
})

export class GrupoOchoCrucerosComponent implements OnInit {

  public isRouteActive: boolean; // Variable para saber si cambio a la vista de habitaciones
  private cruisers: Array<Cruiser>;
  private tableBoatsHeader: Array<string>;
  private tableRoutesHeader: Array<string>;

  constructor(private router: Router, private api: ApiService){
    this.isRouteActive = false;
    // Headers de la tabla dinamica
    this.tableBoatsHeader = [
      "#",
      "Nombre",
      "Cap. de pasajeros",
      "Cap. de carga",
      "Modelo",
      "Linea",
      "Status"
    ];

    /* this.tableRoutesHeader = [
      "#",
      "Nombre",
      "Cap. de pasajeros",
      "Cap. de carga",
      "Modelo",
      "Linea",
      "Status"
    ]; */
  }

  ngOnInit(){
    if(this.router.url === '/cruisers/agregar-crucero'){
      this.isRouteActive = true;
    }
    else {
      this.isRouteActive = false;
    }
    this.getCruisers();
  }

  public getCurrentRoute(route){
    if(route === '/agregar-crucero'){
      this.isRouteActive = true;
      this.router.navigate(['cruisers', 'agregar-crucero']);
    }
    else {
      this.isRouteActive = false;
    }
  }

  public getDeactivatedComponent(component){
    this.getCurrentRoute('/cruisers');
  }

  /*******************************************
  * Metodo para obtener la lista de cruceros *
  ********************************************/
  public getCruisers(){
    this.api.getUrl(url.endpoint.default._get.cruisers.get_cruisers)
      .then(response => {
        this.setCruisers(response);
      })
      .catch(error => {

      })
  }

  /*********************************************
  * Metodo para setear la variable de cruceros *
  **********************************************/
  public setCruisers(cruisers: Array<Cruiser>){
    this.cruisers = cruisers;
  }

  /************************************************
  * Metodo para retornar la variable de cruceros  *
  *************************************************/
  public getVariableCruisers(): Array<Cruiser>{
    return this.cruisers;
  }

  public getTableHeaders(): Array<string>{
    return this.tableBoatsHeader;
  }
}
