import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {

  public headerTitle: string;
  public tableHeaders: Array<string>;
  public routesCruiser: Array<Object>;

  constructor(private localStorage: LocalStorageService) { 
    this.headerTitle = "";
    this.tableHeaders = [
      "#",
      "Fecha de salida",
      "Fecha de llegada",
      "Precio",
      "Ubicación de salida",
      "Ubicación de llegada"
    ]
    this.routesCruiser = [];
  }
  
  ngOnInit() {
    this.localStorage.getItem('cruiserRoutes').subscribe(data => {
      if(data.length !== 0){
        this.headerTitle = "Rutas de | " +data['name'];
        this.routesCruiser = data;
      }
      else {
        this.routesCruiser = [];
        this.localStorage.getItem('boat').subscribe(data =>{
          this.headerTitle += this.headerTitle = "No hay rutas disponibles para | "+data['name'];
        })  
      }
    })
  }

}
