import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  providers: [ApiService]
})
export class BrandComponent {

  constructor(private apiService: ApiService) { 
  	this.getBrands();
  }

  brands: Array<object>

  getBrands(){
  	this.apiService.getUrl('brands').then(
      (resp) => {
        this.brands = resp
       },
      (fail) => {
        if (fail.error) {
          Swal.fire({
            title: fail.error,
            type: 'error',
          })
        } else {
          Swal.fire({
            title: 'Error: ' + fail.status,
            text: fail.name + '. ' + fail.statusText,
            type: 'error',
          })
        }
      }
    );
  }

}
