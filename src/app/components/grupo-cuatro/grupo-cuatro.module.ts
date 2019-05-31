import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TicketSaleFlightComponent } from './ticket-sale-flight/ticket-sale-flight.component';
import { CheckInComponent } from './check-in/check-in.component';
import { TicketSaleShipComponent } from './ticket-sale-ship/ticket-sale-ship.component';
import {GrupoCuatroRoutingModule} from './grupo-cuatro-routing.module';

@NgModule({
  declarations: [
    TicketSaleFlightComponent,
    CheckInComponent,
    TicketSaleShipComponent
    ],
  imports: [
    GrupoCuatroRoutingModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule
  ],
  providers: [ApiService],
  
})
export class GrupoCuatroModule { }