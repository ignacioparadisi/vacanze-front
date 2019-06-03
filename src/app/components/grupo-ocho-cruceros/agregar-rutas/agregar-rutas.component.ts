import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Cruiser } from '../../../interfaces/cruiser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { environment as url} from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-agregar-rutas',
  templateUrl: './agregar-rutas.component.html',
  styleUrls: ['./agregar-rutas.component.scss']
})
export class AgregarRutasComponent implements OnInit {

  public boat: Cruiser;
  public countries: Array<Object>;
  public citiesArrival: Array<Object>;
  public citiesDeparture: Array<Object>;
  public countriesDeparture: Array<Object>;
  public countriesArrival: Array<Object>;

  // Formulario para agregar una ruta a un crucero en especifico
  public routingForm: FormGroup = new FormGroup({
    departureDate : new FormControl(null,[
      Validators.required
    ]),
    arrivalDate : new FormControl(null,[
      Validators.required
    ]),
    price : new FormControl(null,[
      Validators.required,
      Validators.minLength(1),
      Validators.pattern("^[0-9]+(.[0-9]{0,5})?$")
    ]),
    locDeparture: new FormControl(null, [
      Validators.required
    ]),
    locArrival: new FormControl(null, [
      Validators.required
    ])
  });

  constructor(private localStorage: LocalStorageService, private location: Location, private api: ApiService, private router: Router) { }

  ngOnInit() {
    // Obtengo del local el crucero seleccionado
    this.localStorage.getItem('boat').subscribe(data => {
      this.boat = data;
      this.getCountryDeparture();
      this.getCountryArrival();
    })
  }

  ngOnDestroy(){
    this.localStorage.removeItem('boat');
  }

  public goToCruisers(){
    this.router.navigate(['cruceros']);
  }

  /******************************************************************************
  * Metodo para hacer submit del formulario de la ruta relacionada a un crucero *
  *******************************************************************************/
  public onSubmit(){
    let form = {
      cruiserId: this.boat['id'],
      departureDate: this.routingForm.value.departureDate,
      arrivalDate: this.routingForm.value.arrivalDate,
      price: this.routingForm.value.price,
      locDeparture: this.routingForm.value.locDeparture,
      locArrival: this.routingForm.value.locArrival
    }

    this.api.postUrl(url.endpoint.default._post.cruisers.post_route, form, [this.boat['id'].toString()])
      .then(response => {
        this.routingForm.reset();
        this.successfullyResponse();
      })
      .catch(error => {
        this.errorOcurred();
      })
  }

  /***********************************************************
  * Metodo para obtener los paises de la ubicacion de salida *
  ************************************************************/
  public getCountryDeparture() {
    this.api.getUrl(url.endpoint.default._get.getCountry)
      .then(response => {
        this.countriesDeparture = response;
      })
      .catch(error => {

      })
  }

  /************************************************************
  * Metodo para obtener los paises de la ubicacion de llegada *
  *************************************************************/
  public getCountryArrival() {
    this.api.getUrl(url.endpoint.default._get.getCountry)
      .then(response => {
        this.countriesArrival = response;
      })
      .catch(error => {

      })
  }

  /******************************************************
  * Metodo para obtener las ciudades de fecha de salida *
  *******************************************************/
  public getCityDeparture(id: number) {
    this.api.getUrl(url.endpoint.default._get.getCity, [id.toString()])
      .then(response => {
        this.citiesDeparture = [];
        this.citiesDeparture = response;
      })
      .catch(error => {

      })
  }

  /*******************************************************
  * Metodo para obtener las ciudades de fecha de llegada *
  ********************************************************/
  public getCityArrival(id: number) {
    this.api.getUrl(url.endpoint.default._get.getCity, [id.toString()])
      .then(response => {
        this.citiesArrival = [];
        this.citiesArrival = response;
      })
      .catch(error => {

      })
  }

  public selectCountryDeparture(event) {
    this.getCityDeparture(event.target.value);
  }

  public selectCountryArrival(event) {
    this.getCityArrival(event.target.value);
  }

  public selectCityDeparture(event) {
    this.routingForm.value.locDeparture = event.target.value;
  }

  public selectCityArrival(event) {
    this.routingForm.value.locArrival = event.target.value;  
  }

  get departureDate(){
    return this.routingForm.get('departureDate');
  }

  get arrivalDate(){
    return this.routingForm.get('arrivalDate');
  }

  get price(){
    return this.routingForm.get('price');
  }

  private errorOcurred(){
    let config: SweetAlertOptions = {
      title: 'Ha ocurrido un error al añadir una ruta',
      type: 'error',
      showConfirmButton: true,
      timer: 1500
    }
    Swal.fire(config).then( result =>{
      //console.log(result);
    });
  }

  private successfullyResponse(){
    let config: SweetAlertOptions = {
      title: 'Ruta creada al crucero '+ this.boat['name'],
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    }
    Swal.fire(config).then( result =>{});
  }
}
