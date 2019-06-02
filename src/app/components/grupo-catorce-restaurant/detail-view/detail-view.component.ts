import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Location } from "@angular/common";
import { environment as url } from '../../../../environments/environment';
import { SweetAlertOptions } from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  public isDataLoaded: boolean =false
  public restaurant  //Variable que agarrara el JSON de lo datos del restaurant del LS
  public formInfo //Variable que agarrara el JSON de lo datos del usuario/Init form del LS
  public date = ''

  constructor(private router: Router,
    private localStorage: LocalStorageService,
    private api: ApiService,
    private _location: Location) { 
  
  }

  ngOnInit() {
    this.date = this.actualDate()
    this.getLocalStorage()
  }

  public getLocalStorage(){
    this.localStorage.getItem('resRestaurant').subscribe(storedRes =>{
      if(storedRes){
        this.isDataLoaded = true
        this.restaurant = storedRes.reservation
        this.formInfo = storedRes.userDatos
        console.log('Datos del restaurant: ', this.restaurant)
        console.log('Datos del usuario que agarro el restaurant:', this.formInfo)
      }
    })
  }

  public destroyLocalStorage(){
    this.localStorage.removeItem('resRestaurant')
    this.localStorage.removeItem('formReserva')
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

  public goBack(){
    //TODO eliminar los datos de resRestaurant del LocalStorage
    this.localStorage.removeItem('resRestaurant')
    this.formInfo =''
    this.restaurant = ''
    this.isDataLoaded = false
    this._location.back()
  }

  public onSubmit(){
    //postResRestaurant
    console.log('en submit')
    this.api.postUrl(url.endpoint.default._post.postResRestaurant,{
      fecha_res: this.formInfo.timeStamp,
      cant_people: this.formInfo.cantPeople,
      date: this.date,
      user_id :this.formInfo.userID,
      rest_id: this.restaurant.id
    }).then(response =>{
      console.log('Registro ID: ', response)
      this.restaurantCreatedSuccessfully()
    }).catch(error => {
      console.log('error por algun motivo', error)
      this.error()
    })
  }

  private error(){
    let config: SweetAlertOptions = {
      title: 'Sorry, not availability at this hour',
      type: 'error',
      showConfirmButton: true
    }
    Swal.fire(config).then( result =>{
      this.goBack()
    });
  }

  private restaurantCreatedSuccessfully(){
    let config: SweetAlertOptions = {
      title: 'Reservation added.',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    }
    Swal.fire(config).then( result =>{
      console.log(result);
      this.destroyLocalStorage()
      this.router.navigate(['mis-reservas']);
    });
  }
}
