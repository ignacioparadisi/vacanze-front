import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import {RegisterUserModule} from "../components/users/register-user/register-user.module";


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    HttpClientModule,
    RegisterUserModule,
    CommonModule,
    FormsModule,
    LayoutRoutingModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()

  ]
})
export class LayoutModule { }
