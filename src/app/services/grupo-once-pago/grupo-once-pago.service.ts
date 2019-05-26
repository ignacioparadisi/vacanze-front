import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GrupoOncePagoService {

  constructor() { }
  getPaymentMethod() {
    return [
      { "id": 1, "name": "TDC" },
      { "id": 2, "name": "TDB" },
      { "id": 3, "name": "TRANS" },
      { "id": 4, "name": "EF" }
    ];
  }
  getOrderList() {
    return[
      { "id": 1, "name": "Crucero mar caribe", "cantidad":5, "precio":25000, "brand": "Royal Caribean" },
      { "id": 2, "name": "Habitacion master Hilton","cantidad":3, "precio":50000,"brand": "Hilton ca" },
      { "id": 3, "name": "Camioneta 4x4","cantidad":1,"precio":12500,"brand": "Hertz" },
    ];
  }

}
