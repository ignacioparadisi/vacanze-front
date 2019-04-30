import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FlightReservationsComponent} from './flight-reservations.component';
import {FlightReservationsRoutingModule} from './flight-reservations-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    FlightReservationsComponent],
  imports: [
    FlightReservationsRoutingModule,
    CommonModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  
})
export class FlightReservationsModule { }