import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss']
})
export class HabitacionesComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() { }

  public goToBoats(){
    this._location.back();
  }

}
