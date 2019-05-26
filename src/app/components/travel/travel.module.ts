import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TravelRoutingModule } from './travel-routing.module';
import { TravelComponent } from './travel.component';
import { CreateTravelComponent } from './create-travel/create-travel';
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    TravelComponent,
    CreateTravelComponent
  ],
  imports: [
    CommonModule,
    TravelRoutingModule,
    HttpClientModule,
    NgbModalModule
  ]
})
export class TravelModule { }
