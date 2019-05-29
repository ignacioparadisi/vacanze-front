import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccionar-automovil',
  templateUrl: './seleccionar-automovil.component.html',
  styleUrls: ['./seleccionar-automovil.component.scss']
})
export class SeleccionarAutomovilComponent implements OnInit {

  private tableAutomobileReservationHeader: Array<String>;
  private tableData: Array<Object>;
  private headerTitle: string;

  constructor() { 
    this.headerTitle = "List of the automobiles for the choosen date!";

    // Headers de la tabla dinamica
    this.tableAutomobileReservationHeader = [
      "Imagen",
      "Marca",
      "Modelo",
      "Capacidad",
      "Precio"
    ];

    this.tableData = [
      {
        "imagen" : 1,
        "marca": "Audi",
        "modelo": 'A3',
        "capacidad": 4,
        "precio": 30.4
      },
      {
        "imagen" : 2,
        "marca": "BMW",
        "modelo": 'Z3',
        "capacidad": 2,
        "precio": 50.1
      },
      {
        "imagen" : 3,
        "marca": "Ford",
        "modelo": 'Mustang',
        "capacidad": 5,
        "precio": 45.99
      },
    ]
  }

  ngOnInit() {
    console.log("Auida")
  } 

  public getHeaderTitle(){
    return this.headerTitle;
  }

  public getAutomobileReservation(){
    return this.tableData;
  }

  public getHeaderAutomobileReservation(){
    return this.tableAutomobileReservationHeader;
  }
}
