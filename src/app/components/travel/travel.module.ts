import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TravelRoutingModule } from './travel-routing.module';
import { TravelComponent } from './travel.component';
import { CreateTravelComponent } from './create-travel/create-travel';
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { DetailTravelComponent } from './detail-travel/detail-travel.component';
import { CarouselComponent } from './detail-travel/carousel/carousel.component';

@NgModule({
  declarations: [
    TravelComponent,
    CreateTravelComponent,
    DetailTravelComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    TravelRoutingModule,
    HttpClientModule,
    NgbModalModule
  ]
})
export class TravelModule { }
