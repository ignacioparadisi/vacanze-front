import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-automoviles',
  templateUrl: './automoviles.component.html',
  styleUrls: ['./automoviles.component.scss']
})
export class AutomovilesComponent implements OnInit {

  private tableAutomobilesHeader: Array<String>;
  private tableData: Array<Object>;
  private headerTitle: string;

  @Output() emitRouting = new EventEmitter();

  constructor() { 
    this.headerTitle = "Lista de automoviles";

    // Headers de la tabla dinamica
    this.tableAutomobilesHeader = [
      "#",
      "Marca",
      "Modelo",
      "Cap. de pasajeros",
      "Precio por Dia"
    ];

    this.tableData = [
      {
        "id" : 1,
        "brand": "Audi",
        "model": "A4",
        "passangers_capacity": 5,
        "price": 69+"$"
      },
      {
        "id" : 1,
        "brand": "Audi",
        "model": "A4",
        "passangers_capacity": 5,
        "price": 69+"$"
      }
    ]
  }

  ngOnInit() {
    console.log("ENTRO");
  }


  public getAutomobiles(){
    return this.tableData;
  }

  public getHeaderAutomobiles(){
    return this.tableAutomobilesHeader;
  }

  public getHeaderTitle(){
    return this.headerTitle;
  }

  public getCurrentRoute(route){
    this.emitRouting.emit(route);
  }
}
