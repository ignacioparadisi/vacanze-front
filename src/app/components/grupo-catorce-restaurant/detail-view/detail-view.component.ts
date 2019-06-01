import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Location } from "@angular/common";
import { environment as url } from '../../../../environments/environment';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  public isDataLoaded: boolean =false
  public restaurant ='' //Variable que agarrara el JSON de lo datos del restaurant del LS
  public formInfo=' ' //Variable que agarrara el JSON de lo datos del usuario/Init form del LS

  constructor(private router: Router,
    private localStorage: LocalStorageService,
    private api: ApiService,
    private _location: Location) { 
  
  }

  ngOnInit() {
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

  public goBack(){
    //TODO eliminar los datos de resRestaurant del LocalStorage
    this.localStorage.removeItem('resRestaurant')
    this.formInfo =''
    this.restaurant = ''
    this.isDataLoaded = false
    this._location.back()
  }
}
