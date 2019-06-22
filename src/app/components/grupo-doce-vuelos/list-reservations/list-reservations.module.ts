import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ListReservationsComponent } from '../list-reservations/list-reservations.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [ListReservationsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [ApiService],
  exports: [ListReservationsComponent]
})
export class ListReservationsModule { }
