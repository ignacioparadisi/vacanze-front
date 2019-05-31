import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  pantallaCheckIn(){
    var pagina, liEquipaje, liCheckIn;
    pagina = document.getElementById('paginaCheckIn');
    liCheckIn = document.getElementById('li-check-in');
    liEquipaje = document.getElementById('li-equipaje');
    
  
    pagina.style.display = "block";
    liCheckIn.style.display = "none";
    liEquipaje.style.display = "none";
  }
  pantallaEquipaje(){
    var pagina, liEquipaje, liCheckIn;
    pagina = document.getElementById('paginaEquipaje');
    liCheckIn = document.getElementById('li-check-in');
    liEquipaje = document.getElementById('li-equipaje');

    pagina.style.display = "block";
    liEquipaje.style.display = "none";
    liCheckIn.style.display = "none";
  }
  listadoEquipaje(){
    var pagina;

    pagina = document.getElementById('equipajeLista');

    if(pagina.style.display == 'none'){
    pagina.style.display = 'block';
    }
    else{
    pagina.style.display = 'none';
    }
  }
}
