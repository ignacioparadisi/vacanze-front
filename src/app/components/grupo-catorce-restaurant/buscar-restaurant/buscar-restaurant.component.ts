import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { reservationRestaurant } from '../../../classes/reservation-restaurant' //class
import { reservationHour } from '../../../classes/reservation-hours' //class
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { environment as url } from '../../../../environments/environment';

@Component({
  selector: 'app-buscar-restaurant',
  templateUrl: './buscar-restaurant.component.html',
  styleUrls: ['./buscar-restaurant.component.scss']
})

export class BuscarRestaurantComponent implements OnInit {
  
  public cantidadPersonas: reservationRestaurant[]=[]
  public horaReserva: reservationHour[] = []
  public subM: boolean = false
  public formGroup: FormGroup
  public isDataLoaded: boolean = false
  private userId:number
  public countries: any[];
  public cities: any[];

  constructor(private api: ApiService, private router: Router,private localStorage: LocalStorageService) {
    this.countries = [];
    this.getCountry();
   }

  ngOnInit() {
    this.peopleDinner()
    this.hourDinner()
    this.getLocalStorage()

    var date = this.actualDate()
    this.formGroup = new FormGroup({
      cantidadPersonas: new FormControl(-1, [
        Validators.required
      ]),
      fechaReserva: new FormControl(null, [
        Validators.required
      ]),
      horaReserva: new FormControl(-1, [
        Validators.required
      ]),
      pais: new FormControl(-1, [
        Validators.required
      ]),
      ciudad: new FormControl(-1, [
        Validators.required
      ])
    })
    document.getElementById("reserva").setAttribute("min", date);
  }

  public onSubmit() {
    if(this.formGroup.get('horaReserva').value != -1 && this.formGroup.get('ciudad').value != -1 && 
      this.formGroup.get('pais').value != -1 && this.formGroup.get('cantidadPersonas').value != -1 && 
      this.formGroup.get('fechaReserva').valid){
      
      var datosReserva ={
        userID:this.userId,
        timeStamp: this.formGroup.get('fechaReserva').value+' '+this.formGroup.get('horaReserva').value,
        cantPeople: this.formGroup.get('cantidadPersonas').value,
        ciudad:this.formGroup.get('ciudad').value
      }
      console.log(datosReserva.ciudad)
      this.localStorage.setItem('formReserva', datosReserva).subscribe(datosReserva =>{
        
        console.log('Datos de la reserva',datosReserva)
        this.router.navigate(['restaurant-reservation/list-restaurant']);
      })
      
    }
    else{
      this.subM =true
      console.log('error')
    }
  }
 
  private peopleDinner(): reservationRestaurant[]{
    this.cantidadPersonas = [
      new reservationRestaurant(1, '1 people'),
      new reservationRestaurant(2, '2 people'),
      new reservationRestaurant(3, '3 people'),
      new reservationRestaurant(4, '4 people'),
      new reservationRestaurant(5, '5 people'),
      new reservationRestaurant(6, '6 people')
    ]
    return this.cantidadPersonas
  }

  private hourDinner(): reservationHour[]{
    this.horaReserva =[
      new reservationHour('12:00','12:00 pm'),
      new reservationHour('13:00', '1:00 pm'),
      new reservationHour('14:00', '2:00 pm'),
      new reservationHour('15:00', '3:00 pm'),
      new reservationHour('16:00', '4:00 pm'),
      new reservationHour('17:00', '5:00 pm'),
      new reservationHour('18:00', '6:00 pm'),
      new reservationHour('19:00', '7:00 pm'),
      new reservationHour('20:00', '8:00 pm'),
      new reservationHour('21:00', '9:00 pm'),
      new reservationHour('22:00', '10:00 pm'),
      new reservationHour('23:00', '11:00 pm')
    ]
    return this.horaReserva
  }

  private actualDate(){
    var date = new Date()

    var month = date.getMonth()+1
    var year = date.getFullYear()
    var day = date.getDate()
    
    if (month<10){
      if(day <10){
        var fecha = year +'-0'+ month+'-0'+day
        return fecha
      }
      var fecha = year +'-0'+ month+'-'+day
      return fecha
    }
    else{
      var fecha = year +'-'+ month+'-'+day
      return fecha
    }
  }

  public getLocalStorage(){
    this.localStorage.getItem('id').subscribe(storedId =>{
      if(storedId){
        this.isDataLoaded = true
        this.userId = storedId
      }
    })
  }  

  public getCity(id: number) {
    this.api
        .getUrl(url.endpoint.default._get.getCity, [id.toString()])
        .then(response => {
            this.cities = response;
    }, error => console.error(error));
  }

  public getCountry() {
    this.api
        .getUrl(url.endpoint.default._get.getCountry)
        .then(response => {
            this.countries = response;
    }, error => console.error(error));
  }

  public selectCountry(event) {
    console.log(event.target.value);
    this.getCity(event.target.value);
  }
}
