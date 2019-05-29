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

  public isRoomActive: boolean; // Variable para saber si cambio a la vista de habitaciones
  private cruisers: Array<Cruiser>;
  private tableBoatsHeader: Array<string>;

  constructor(private router: Router, private api: ApiService){
    this.isRoomActive = false;
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
  }

  ngOnInit(){ 
    this.getCruisers();
  }

  public getCurrentRoute(route){
    if(route === '/habitaciones'){
      this.isRoomActive = true;
      this.router.navigate(['cruceros', 'habitaciones']);
    }
    else {
      this.isRoomActive = false;
    }
  }

  public getDeactivatedComponent(component){
    this.getCurrentRoute('/cruceros');
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
