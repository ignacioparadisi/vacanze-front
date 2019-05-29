import { UsersListComponent } from './users-list.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersListRoutingModule } from './users-list-routing.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { RegisterUserComponent } from '../register-user/register-user.component';

@NgModule({
  declarations: [UsersListComponent, RegisterUserComponent],
  imports: [
    CommonModule,
    UsersListRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    NgbModalModule
  ],
  providers: [ApiService],
  entryComponents: [RegisterUserComponent]
})
export class UsersListModule { }
