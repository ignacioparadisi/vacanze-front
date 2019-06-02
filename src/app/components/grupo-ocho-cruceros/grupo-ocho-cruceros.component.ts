import { Component, OnInit } from '@angular/core';
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";
import { Router } from '@angular/router';
import { Cruiser } from '../../interfaces/cruiser';
import { ApiService } from '../../services/api.service';
import { environment as url } from '../../../environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';
import Swal from 'sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

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
    if(this.router.url === '/cruceros/agregar-crucero'){
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = true;
      this.checks['addRoutes'] = false;
    }
    else if(this.router.url.indexOf('editar-crucero') !== -1){
      this.checks['routes'] = false;
      this.checks['edit'] = true;
      this.checks['add'] = false;
      this.checks['addRoutes'] = false;
    }
    else if(this.router.url.indexOf('rutas') !== -1){
      this.checks['routes'] = true;
      this.checks['edit'] = false;
      this.checks['add'] = false;
      this.checks['addRoutes'] = false;
    }
    else if(this.router.url.indexOf('agregar-ruta') !== -1){
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
    if(route){
      if(route === '/agregar-crucero'){
        this.checks['routes'] = false;
        this.checks['edit'] = false;
        this.checks['add'] = true;
        this.checks['addRoutes'] = false;
  
        this.router.navigate(['cruceros', 'agregar-crucero']);
      }
      else if(route.toString().indexOf('/editar-crucero') !== -1){
        this.checks['routes'] = false;
        this.checks['edit'] = true;
        this.checks['add'] = false;
        this.checks['addRoutes'] = false;
  
        this.router.navigate(['cruceros', route.split('/')[1], route.split('/')[2]]);
      }
      else if(route.toString().indexOf('/rutas') !== -1){
        this.checks['routes'] = true;
        this.checks['edit'] = false;
        this.checks['add'] = false;
        this.checks['addRoutes'] = false;
        this.getLayovers(route.split('/')[0], route);
      }
      else if(route.toString().indexOf('/agregar-ruta') !== -1){
        this.checks['routes'] = false;
        this.checks['edit'] = false;
        this.checks['add'] = false;
        this.checks['addRoutes'] = true;
        this.router.navigate(['cruceros', route.split('/')[1], route.split('/')[2]]);
      }
      else if('/cruceros'){
        this.checks['routes'] = true;
        this.checks['edit'] = false;
        this.checks['add'] = false;
        this.checks['addRoutes'] = false;
      }
      else {
        this.checks['routes'] = true;
        this.checks['edit'] = false;
        this.checks['add'] = false;
        this.checks['addRoutes'] = false;  
      }
    }
    else { // Muestro la tabla de cruceros
      this.checks['routes'] = false;
      this.checks['edit'] = false;
      this.checks['add'] = false;
      this.checks['addRoutes'] = false;    
    }
  }

  public getDeactivatedComponent(component){
    this.getCruisers();
    if(component.router.url.indexOf('/rutas')){
      this.getCurrentRoute(undefined);
    }
    else {
      this.getCurrentRoute('/cruceros');
    }
  }

  public getDeleteAlert(data){
    if(data['delete']){
       // Si marco confirmar en la moda, quiero borrar el crucero
      if(data['confirmed']){
        this.api.deleteUrl(url.endpoint.default._delete.cruisers.delete_cruiser, [data['id']])
          .then(response => {
            this.alertStatus(200, true, data);  
          })
          .catch(error => {
            
          })
      }
    }
    else {
      if(data['confirmed']){
        let form = {
          'id': data['id'],
          'name': data['name'],
          'line': data['line'],
          'model': data['model'],
          'loadingShipCap': data['loadingShipCap'],
          'capacity': data['capacity'],
          'picture': data['picture'],
          'status': !data['status']
        }
        
        this.api.putUrl(url.endpoint.default._post.cruisers.post_cruiser, form)
          .then(response => {
            this.alertStatus(200, false, data);
          })  
          .catch(error => {
            console.log("error", error);
          })  
      }
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
        this.localStorage.setItem('cruiserRoutes', response).subscribe(data => {
          this.router.navigate(['cruceros', route.split('/')[0], route.split('/')[1]]);
        })
      })
      .catch(er => {
        if(er['error'] === "No se encontraron rutas para este crucero"){
          console.log("errr", er);
        }
      })
  }

  private alertStatus(statusCode: number, deleted: boolean, data: any) {
    const config: SweetAlertOptions = {
      // tslint:disable-next-line:max-line-length
      title: (statusCode !== 200 ? 'Se ha producido un error' : (deleted ? 'Crucero eliminado' : 'Se cambió el estatus del crucero')),
      type:  (statusCode === 200 ? 'success' : 'error'),
      showConfirmButton: true
    };
    Swal.fire(config).then( result => {
      if(deleted){
        this.deleteCruiserById(data['id']);
      }
      else {
        this.updateCruiserFromStatus(data);
      }
    });
  }

  public updateCruiserFromStatus(data: any){
    let cruisers = this.getVariableCruisers();
    let aux = [];
    this.cruisers.forEach(cruiser => {
      if(cruiser['id'] === data['id']){
        cruiser['status'] = !cruiser['status'];
      }
      aux.push(cruiser);
    })
    this.setCruisers(aux);
  }

  public cruiserSuccessfullyCreated(){
    let config: SweetAlertOptions = {
      title: 'Crucero creado',
      type: 'success',
      showConfirmButton: false,
      timer: 900
    }
    Swal.fire(config).then( result =>{});
  }
}