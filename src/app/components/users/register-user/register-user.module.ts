import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { RegisterUserComponent } from '../register-user/register-user.component';

@NgModule({
  declarations: [RegisterUserComponent],
  imports: [
    CommonModule,
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
export class RegisterUserModule { }
