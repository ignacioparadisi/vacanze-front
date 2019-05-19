import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { RegisterHotelRoutingModule } from './register-hotel-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterHotelComponent } from './register-hotel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterHotelComponent],
  imports: [
    CommonModule,
    RegisterHotelRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService]
})
export class RegisterHotelModule { }
