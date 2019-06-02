import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

    constructor() { }

    getHeaderTitle(){
      return "Lista de hoteles";
    }

    getHotelsHeaders(){
      return [
        "#",
        "Nombre",
        "Habitaciones",
        "Teléfono",
        "Sitio Web",
        "Estatus"
      ];
    }

}
