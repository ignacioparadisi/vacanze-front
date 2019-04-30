import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FlightReservationsComponent} from './flight-reservations.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    FlightReservationsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  
})
export class FlightReservationsModule { }