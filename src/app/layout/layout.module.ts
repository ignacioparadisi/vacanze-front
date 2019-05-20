import { HttpClientModule } from "@angular/common/http";
import { ApiService } from "src/app/services/api.service";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RegisterUserComponent } from "../components/register-user/register-user.component";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { RegisterRestaurantComponent } from '../components/register-restaurant/register-restaurant.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    RegisterUserComponent,
    RegisterRestaurantComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule
  ],
  providers: [ApiService],
  entryComponents: [RegisterUserComponent, RegisterRestaurantComponent],
})
export class LayoutModule {}
