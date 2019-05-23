import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/classes/role';
import { Location } from "@angular/common";
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-hotel',
  templateUrl: './register-hotel.component.html',
  styleUrls: ['./register-hotel.component.scss']
})
export class RegisterHotelComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  public goToViewHotels(){
    this._location.back();
  }
  
}
