import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccionar-restaurant',
  templateUrl: './seleccionar-restaurant.component.html',
  styleUrls: ['./seleccionar-restaurant.component.scss']
})
export class SeleccionarRestaurantComponent implements OnInit {

  private tableRestaurantReservationHeader: Array<String>;
  private tableData: Array<Object>;
  private headerTitle: string;

  constructor() { 
    this.headerTitle = "List of the restaurants for the choosing date!";

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
    ];

    this.tableData = [
      {
        "imagen" : 1,
        "nombre": "Queen Elizabeth",
        "direccion": 'Maracay',
        "capacidad": 100,
        "especialidad": "Comida italiana",
        "precio": 300.4,
        "descripcion": "Restaurante familiar de comida italiana",
        "telefono": "0243-2351429"
      },
      {
        "imagen" : 2,
        "nombre": "Queen Mary",
        "direccion": 'Caracas',
        "capacidad": 200,
        "especialidad": "Comida alemana",
        "precio": 203,
        "descripcion": "Restaurante familiar de comida alemana",
        "telefono": "0212-2362719"
      },
      {
        "imagen" : 3,
        "nombre": "Mohamed",
        "direccion": 'Valencia',
        "capacidad": 50,
        "especialidad": "Comida arabe",
        "precio": 354,
        "descripcion": "Restaurante familiar de comida arabe",
        "telefono": "0241-2351429"
      },
    ]
  }

  ngOnInit() {
    console.log("Auida")
  } 

  public getRestaurantReservation(){
    return this.tableData;
  }

  public getHeaderRestaurantReservation(){
    return this.tableRestaurantReservationHeader;
  }

  public getHeaderTitle(){
    return this.headerTitle;
  }
}
