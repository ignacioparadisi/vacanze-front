import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { ViewHotelsBackofficeRoutingModule } from './view-hotels-backoffice-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHotelsBackofficeComponent } from './view-hotels-backoffice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewHotelsBackofficeComponent],
  imports: [
    CommonModule,
    ViewHotelsBackofficeRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService]
})
export class ViewHotelsBackofficeModule { }
