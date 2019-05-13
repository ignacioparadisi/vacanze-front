import { Component, OnInit } from '@angular/core';
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";

@Component({
  selector: 'app-grupo-ocho-cruceros',
  templateUrl: './grupo-ocho-cruceros.component.html',
  styleUrls: ['./grupo-ocho-cruceros.component.scss']
})

export class GrupoOchoCrucerosComponent implements OnInit {

  private tableBoatsHeader: Array<String>;
  private tableData: Array<Object>;
  private headerTitle: string;

  constructor() { 
    this.headerTitle = "Lista de cruceros";

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

    this.tableData = [
      {
        "id" : 1,
        "name": "Queen Elizabeth",
        "passangers_capacity": 1500,
        "overload_capacity": 5400,
        "model": "Loyalty Tour",
        "line": "Tourist C.A.",
        "status": "Active"
      },
      {
        "id" : 2,
        "name": "Queen Mary",
        "passangers_capacity": 1123,
        "overload_capacity": 6350,
        "model": "Loyalty Tour",
        "line": "Anyone",
        "status": "Active"
      },
      {
        "id" : 3,
        "name": "Liberty of the Seas",
        "passangers_capacity": 1123,
        "overload_capacity": 6350,
        "model": "Loyalty Tour",
        "line": "Another one",
        "status": "Inactive"
      },
    ]
  }

  ngOnInit() {
  }


  public getBoats(){
    return this.tableData;
  }

  public getHeaderBoats(){
    return this.tableBoatsHeader;
  }

  public getHeaderTitle(){
    return this.headerTitle;
  }
}
