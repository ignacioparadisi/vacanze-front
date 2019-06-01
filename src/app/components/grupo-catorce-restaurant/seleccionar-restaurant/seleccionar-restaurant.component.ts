import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { environment as url } from '../../../../environments/environment';
import { Location } from "@angular/common";
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-seleccionar-restaurant',
  templateUrl: './seleccionar-restaurant.component.html',
  styleUrls: ['./seleccionar-restaurant.component.scss']
})
export class SeleccionarRestaurantComponent implements OnInit {

  private tableRestaurantReservationHeader: Array<String>;
  private tableData: Array<Object>;
  private headerTitle: string;
  public restaurants = []
  public formData = this.localStorage.getItem('formReserva')

  constructor(private api: ApiService,private _location: Location,private localStorage: LocalStorageService) { 
    this.headerTitle = "List of the restaurants for the choosen date and location!";

    // Headers de la tabla dinamica
    this.tableRestaurantReservationHeader = [
      "Imagen",
      "Nombre",
      "Direccion",
      "Capacidad",
      "Especialidad",
      "Precio",
      "Descripcion",
      "Telefono"
    ]

    this.loadRestaurants()
  }

  ngOnInit() {
    console.log("Auida")
    console.log(this.formData)
  } 

  public loadRestaurants(){
    
    //enpoint es uno de los aributos de esa clase enviroment
    //default es el url base de la clase enviroment
    this.api.getUrl(url.endpoint.default._get.getRestaurant)
    .then(response => {
          this.tableData = response,
          console.log(response)
          console.log(this.tableData)
    }).catch( error => {
          console.log('Error carga inicial de restaurantes', error);
    });
  }

  public getRestaurants() {
    return this.tableData;
  }

  public getHeaderRestaurantReservation(){
    return this.tableRestaurantReservationHeader;
  }

  public getHeaderTitle(){
    return this.headerTitle;
  }

  public goBack(){
    this._location.back();
  }
}
