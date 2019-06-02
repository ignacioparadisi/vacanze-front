import { UsersListComponent } from './users-list.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersListRoutingModule } from './users-list-routing.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { RegisterUserComponent } from '../register-user/register-user.component';
import {RegisterUserModule} from "../register-user/register-user.module";

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    RegisterUserModule,
    UsersListRoutingModule
  ]
})
export class UsersListModule { }
