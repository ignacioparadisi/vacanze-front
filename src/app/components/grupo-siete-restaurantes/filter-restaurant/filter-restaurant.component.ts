import { ApiService } from '../../../services/api.service';
import { Component, Input, Output, OnChanges, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../classes/role';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { environment as url } from '../../../../environments/environment';

@Component({
  selector: 'app-filter-restaurant',
  templateUrl: './filter-restaurant.component.html',
  styleUrls: ['./filter-restaurant.component.scss'],
  providers: [ApiService]
})
export class FilterRestaurantComponent implements OnInit {

  public searchForm: FormGroup;
  public countries: any[];
  public cities: any[];
  @Output() public locationIdEmiter = new EventEmitter();
  public filterAll : boolean;


  constructor(private service: ApiService) {
    this.searchForm = new FormGroup({
        country: new FormControl("", [
          Validators.required
        ]),
        city: new FormControl("", [])
    });
    this.filterAll = false;
    this.getCountry();
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.filterAll==false){
      this.locationIdEmiter.emit(this.searchForm.get('city').value);
    }else{
      this.locationIdEmiter.emit("-1");
    }
  }

  onSubmitAll(){
    this.locationIdEmiter.emit("-1");
  }

  public getCountry() {
    this.service
        .getUrl(url.endpoint.default._get.getCountry)
        .then(response => {
            this.countries = response
    }, error => console.error(error));
  }

  public getCity(id: number) {
    this.service
        .getUrl(url.endpoint.default._get.getCity, [id.toString()])
        .then(response => {
            this.cities = response;
    }, error => console.error(error));
  }

  public selectCountry(event) {
    if(event.target.value.toString()!="-1"){
      this.filterAll = false;
      this.getCity(event.target.value);
    }else{
      this.cities = [];
      this.filterAll = true;
    }
  }
}
