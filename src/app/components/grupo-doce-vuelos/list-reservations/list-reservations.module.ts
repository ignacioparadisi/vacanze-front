import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import {FlightReservationsModule} from '../flight-reservations/flight-reservations.module'
import {ListReservationsComponent} from '../list-reservations/list-reservations.component'
import {FlightReservationsComponent} from '../flight-reservations/flight-reservations.component';

@NgModule({
  declarations: [ListReservationsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FlightReservationsModule,
    FlightReservationsComponent
  ],
  providers: [ApiService]
})
export class ListReservationsModule { }
