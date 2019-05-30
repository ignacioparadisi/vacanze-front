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

  public checks: Object; // Variable para saber si cambio a la vista de rutas
  private cruisers: Array<Cruiser>;
  private tableBoatsHeader: Array<string>;
  private tableRoutesHeader: Array<string>;

  constructor(private router: Router, private api: ApiService){
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
    this.checks = {
      routes: false,
      edit: false,
      add: false
    }
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
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = true;
    }
    else if(this.router.url.indexOf('editar-crucero') !== -1){
      this.checks['routes'] = false;
      this.checks['edit'] = true;
      this.checks['add'] = false;
    }
    this.getCruisers();
  }

  public getCurrentRoute(route, param?: string){
    if(route === '/agregar-crucero'){
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = true;

      this.router.navigate(['cruisers', 'agregar-crucero']);
    }
    else if(route.toString().indexOf('/editar-crucero') !== -1){
      this.checks['routes'] = false;
      this.checks['edit'] = true;
      this.checks['add'] = false;

      this.router.navigate(['cruisers', route.split('/')[1], route.split('/')[2]]);
    }
    else {
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = false;
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
