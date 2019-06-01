import { Component, OnInit } from '@angular/core';
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";
import { Router } from '@angular/router';
import { Cruiser } from '../../interfaces/cruiser';
import { ApiService } from '../../services/api.service';
import { environment as url } from '../../../environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-grupo-ocho-cruceros',
  templateUrl: './grupo-ocho-cruceros.component.html',
  styleUrls: ['./grupo-ocho-cruceros.component.scss'],
  providers: [ApiService]
})

export class GrupoOchoCrucerosComponent implements OnInit {

  public checks: Object; // Variable para saber si cambio a la vista de rutas
  private cruisers: Array<Cruiser>;
  private tableBoatsHeader: Array<string>;
  private tableRoutesHeader: Array<string>;

  constructor(private router: Router, private api: ApiService, private localStorage: LocalStorageService){
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
      add: false,
      addRoutes: false
    }
  }

  ngOnInit(){
    if(this.router.url === '/cruisers/add-cruiser'){
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = true;
      this.checks['addRoutes'] = false;
    }
    else if(this.router.url.indexOf('edit-cruiser') !== -1){
      this.checks['routes'] = false;
      this.checks['edit'] = true;
      this.checks['add'] = false;
      this.checks['addRoutes'] = false;
    }
    else if(this.router.url.indexOf('add-routes') !== -1){
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = false;
      this.checks['addRoutes'] = true;  
    }
    else if(this.router.url.indexOf('layovers') !== -1){
      this.checks['routes'] = true;
      this.checks['edit'] = false;
      this.checks['add'] = false;
      this.checks['addRoutes'] = false;
    }
    else if(this.router.url.indexOf('add-cruiser-routes') !== -1){
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = false;
      this.checks['addRoutes'] = true;  
    }
    else {
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = false;
      this.checks['addRoutes'] = false;
    }
    this.getCruisers();
  }

  public getCurrentRoute(route, param?: string){
    if(route === '/add-cruiser'){
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = true;
      this.checks['addRoutes'] = false;

      this.router.navigate(['cruisers', 'add-cruiser']);
    }
    else if(route.toString().indexOf('/edit-cruiser') !== -1){
      this.checks['routes'] = false;
      this.checks['edit'] = true;
      this.checks['add'] = false;
      this.checks['addRoutes'] = false;

      this.router.navigate(['cruisers', route.split('/')[1], route.split('/')[2]]);
    }
    else if(route.toString().indexOf('/layovers') !== -1){
      this.checks['routes'] = true;
      this.checks['edit'] = false;
      this.checks['add'] = false;
      this.checks['addRoutes'] = false;
      this.getLayovers(route.split('/')[0], route);
    }
    else if(route.toString().indexOf('/add-cruiser-routes') !== -1){
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = false;
      this.checks['addRoutes'] = true;
      this.router.navigate(['cruisers', route.split('/')[1], route.split('/')[2]]);
    }
    else {
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = false;
      this.checks['addRoutes'] = false;
    }
  }

  public getDeactivatedComponent(component){
    this.getCruisers();
    this.getCurrentRoute('/cruisers');
  }

  public getDeleteAlert(data){
    // Si marco confirmar en la moda, quiero borrar el crucero
    if(data['confirmed']){
      console.log("se ejecuto");
      this.api.deleteUrl(url.endpoint.default._delete.cruisers.delete_cruiser, [data['id']])
        .then(response => {
          this.deleteCruiserById(response['id']);  
        })
        .catch(error => {
          
        })
    }
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

  /***************************************************************
  * Metodo que se ejecuta para actualizar el arreglo de cruceros *
  * debido a la elminacion del crucero por el id                 *
  ****************************************************************/

  public deleteCruiserById(id: number){
    let cruisers = this.getVariableCruisers();
    cruisers = cruisers.filter(cruiser => cruiser['id'] !== id); // Filtro todos los que no tienen el id
    this.setCruisers(cruisers);
  }

  /******************************************
  * Metodo para recibir las rutas del barco *
  *******************************************/
  public getLayovers(id: string, route: string){
    this.api.getUrl(url.endpoint.default._get.cruisers.get_layovers, [id])
      .then(response => {
        console.log("RESPUESTAA", response);
        this.localStorage.setItem('cruiserRoutes', response.layovers).subscribe(data => {
          this.router.navigate(['cruisers', route.split('/')[0], route.split('/')[1]]);
        })
      })
      .catch(er => {
        if(er['error'] === "No se encontraron rutas para este crucero"){
          console.log("errr", er);
        }
      })
  }
}