import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { EditRestaurantRoutingModule } from './edit-restaurant-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRestaurantComponent } from './edit-restaurant.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditRestaurantComponent],
  imports: [
    CommonModule,
    EditRestaurantRoutingModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService]
})
export class EditRestaurantModule { }
