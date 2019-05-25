import { ApiService } from 'src/app/services/api.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./components/grupo-uno/login/login.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  entryComponents: [RegisterUserComponent]
})
export class AppModule { }
