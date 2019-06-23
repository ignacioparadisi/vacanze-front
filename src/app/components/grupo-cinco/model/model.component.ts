import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {

  constructor() {
  	this.getBrands();
  }

  models: Array<object>

  getBrands(){
  	this.models = [
  		{
  			id: 1,
  			name: 'Meru',
  			capacity: 5,
  			photo: '',
  			brand: {
  				id: 1,
  				name: 'Toyota'
  			}
  		},
  		{
  			id: 2,
  			name: 'Corolla',
  			capacity: 4,
  			photo: '',
  			brand: {
  				id: 1,
  				name: 'Toyota'
  			}
  		},
  		{
  			id: 3,
  			name: 'Civic',
  			capacity: 4,
  			photo: '',
  			brand: {
  				id: 1,
  				name: 'Honda'
  			}
  		}
  	]
  }
}
