import { Component, OnInit } from '@angular/core';
import { reservationRestaurant } from 'src/app/classes/reservation-restaurant'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscar-restaurant',
  templateUrl: './buscar-restaurant.component.html',
  styleUrls: ['./buscar-restaurant.component.scss']
})

export class BuscarRestaurantComponent implements OnInit {
  
  public countPeople: reservationRestaurant[]=[]
  public form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.peopleDinner(),
    this.form = new FormGroup({
      cantidadPersona: new FormControl(-1, [Validators.required])
    })
  }

  private peopleDinner(): reservationRestaurant[]{
    this.countPeople = [
      new reservationRestaurant(0, '1'),
      new reservationRestaurant(0, '2'),
      new reservationRestaurant(0, '3'),
      new reservationRestaurant(0, '4'),
      new reservationRestaurant(0, '5'),
      new reservationRestaurant(0, 'Large party')
    ]
    return this.countPeople
  }

}
