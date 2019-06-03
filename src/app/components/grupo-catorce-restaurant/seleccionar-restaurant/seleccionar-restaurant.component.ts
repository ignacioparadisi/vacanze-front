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
  public formData
  public isDataLoaded: boolean = false
  public cityID: number

  constructor(private api: ApiService,
    private _location: Location,
    private localStorage: LocalStorageService) { 
    this.headerTitle = "Lista de restaurantes para la ciudad y fecha seleccionada!";

    // Headers de la tabla dinamica
    this.tableRestaurantReservationHeader = [
      "",
      "Nombre",
      "Dirección",
      "Especialidad",
      "Precio",
      "Descripción ",
      "Contacto",
      "Reservar"
    ]
    
  }

  ngOnInit() {
    console.log("Auida")
    this.getLocalStorage()
  } 

  public getRestaurantById(){
    this.api
        .getUrl(url.endpoint.default._get.getRestaurantByLocation, [this.cityID.toString()])
        .then(response => {
            this.tableData = response;
    }, error => console.error(error));
  }

  public goBack(){
    //TODO eliminar los datos del LocalStorage (lo del formReserva)
    this.localStorage.removeItem('formReserva')
    this.formData =''
    this.isDataLoaded = false
    this._location.back();
  }

  public getLocalStorage(){
    this.localStorage.getItem('formReserva').subscribe(storedRes =>{
      if(storedRes){
        this.isDataLoaded = true
        this.formData = storedRes
        this.cityID = this.formData.ciudad

        console.log('cityID',this.cityID)
        this.getRestaurantById()
      }
    })
  }
  //FUNCIONES PARA LLENAR LA TABLA TABLE-RESPONSIVE-RESERVAS

  public getRestaurants() {
    return this.tableData;
  }

  public getHeaderRestaurantReservation(){
    return this.tableRestaurantReservationHeader;
  }

  public getHeaderTitle(){
    return this.headerTitle;
  }
}
