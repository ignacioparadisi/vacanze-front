import { Component, OnInit } from '@angular/core';
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo-ocho-cruceros',
  templateUrl: './grupo-ocho-cruceros.component.html',
  styleUrls: ['./grupo-ocho-cruceros.component.scss']
})

export class GrupoOchoCrucerosComponent implements OnInit {

  public isRoomActive: boolean; // Variable para saber si cambio a la vista de habitaciones
  
  constructor(private router: Router){ 
    this.isRoomActive = false;
  }

  ngOnInit(){ }

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
}
