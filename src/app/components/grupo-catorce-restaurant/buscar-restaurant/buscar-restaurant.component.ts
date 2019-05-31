import { Component, OnInit } from '@angular/core';
import { reservationRestaurant } from '../../../classes/reservation-restaurant'
import { reservationHour } from '../../../classes/reservation-hours'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-restaurant',
  templateUrl: './buscar-restaurant.component.html',
  styleUrls: ['./buscar-restaurant.component.scss']
})

export class BuscarRestaurantComponent implements OnInit {
  
  public countPeople: reservationRestaurant[]=[]
  public hours: reservationHour[] = []
  public date = this.actualDate()

  constructor(private router: Router) { }

  ngOnInit() {
    this.peopleDinner()
    this.hourDinner()
    this.actualDate()
  }

  public formGroup: FormGroup = new FormGroup({
      
    cantidadPersonas: new FormControl(-1, [
      Validators.required
    ]),
    fechaReserva: new FormControl(null, [
      Validators.required
    ]),
    horaReserva: new FormControl(-1, [
      Validators.required
    ]),
    ciudad: new FormControl(null, [
      Validators.required
    ])
  })

  get cantidadPersonas(){
    return this.formGroup.get('cantidadPersonas')
  }

  get fechaReserva(){
    return this.formGroup.get('fechaReserva')
  }

  get horaReserva(){
    return this.formGroup.get('horaReserva')
  }

  get ciudad(){
    return this.formGroup.get('ciudad')
  }

  public onSubmit() {
    console.log('this is fine')
    console.log(this.formGroup.get('ciudad').value)
    this.router.navigate(['restaurant-reservation/list-restaurant']);
  }
 

  private peopleDinner(): reservationRestaurant[]{
    this.countPeople = [
      new reservationRestaurant(1, '1 people'),
      new reservationRestaurant(2, '2 people'),
      new reservationRestaurant(3, '3 people'),
      new reservationRestaurant(4, '4 people'),
      new reservationRestaurant(5, '5 people'),
      new reservationRestaurant(6, '6 people')
    ]
    return this.countPeople
  }

  private hourDinner(): reservationHour[]{
    this.hours =[
      new reservationHour(12,'12:00 pm'),
      new reservationHour(1, '1:00 pm'),
      new reservationHour(2, '2:00 pm'),
      new reservationHour(3, '3:00 pm'),
      new reservationHour(4, '4:00 pm'),
      new reservationHour(5, '5:00 pm'),
      new reservationHour(6, '6:00 pm'),
      new reservationHour(7, '7:00 pm'),
      new reservationHour(8, '8:00 pm'),
      new reservationHour(9, '9:00 pm'),
      new reservationHour(10, '10:00 pm'),
      new reservationHour(11, '11:00 pm')
    ]
    return this.hours
  }

  private actualDate(){
    var date = new Date()

    var month = date.getMonth()+1
    var year = date.getFullYear()
    var day = date.getDate()
    
    if (month<10){
      var fecha = year +'-0'+ month+'-'+day
      return fecha
    }
    else{
      var fecha = year +'-'+ month+'-'+day
      return fecha
    }
  }
}
