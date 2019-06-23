import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent {

  constructor() { 
  	this.getBrands();
  }

  brands: Array<object>

  getBrands(){
  	this.brands = [
  		{
  			id: 1,
  			name: "Toyota"
  		},
  		{
  			id: 2,
  			name: "Chevrolet"
  		},
  		{
  			id: 3,
  			name: "Honda"
  		},
  	]
  }

}
