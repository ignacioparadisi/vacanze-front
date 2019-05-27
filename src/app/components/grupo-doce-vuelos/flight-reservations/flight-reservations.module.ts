import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FlightReservationsComponent} from './flight-reservations.component';
import {FlightReservationsRoutingModule} from './flight-reservations-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ListReservationsComponent} from '../list-reservations/list-reservations.component';

@NgModule({
  declarations: [
    FlightReservationsComponent,
    ListReservationsComponent
  ],
  imports: [
    FlightReservationsRoutingModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule
  ],
  providers: [ApiService],
  
})
export class FlightReservationsModule { }