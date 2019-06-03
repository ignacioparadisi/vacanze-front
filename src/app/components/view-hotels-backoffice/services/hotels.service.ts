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
        "Capacidad",
        "Teléfono",
        "Sitio Web",
        "Estrellas",
        "Estatus"
      ];
    }

}
