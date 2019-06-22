import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlightReservationsComponent } from './flight-reservations.component';
import { FlightReservationsRoutingModule } from './flight-reservations-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../../services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListReservationsModule } from '../list-reservations/list-reservations.module';

@NgModule({
  declarations: [
    FlightReservationsComponent
  ],
  imports: [
    FlightReservationsRoutingModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    ListReservationsModule
  ],
  providers: [ApiService],
  exports: [FlightReservationsComponent]
})
export class FlightReservationsModule { }