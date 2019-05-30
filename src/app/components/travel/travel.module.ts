import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TravelRoutingModule } from './travel-routing.module';
import { TravelComponent } from './travel.component';
import { CreateTravelComponent } from './create-travel/create-travel';
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { DetailTravelComponent } from './detail-travel/detail-travel.component';
import { CarouselComponent } from './detail-travel/carousel/carousel.component';
import { ModifyTravelComponent } from './modify-travel/modify-travel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TravelComponent,
    CreateTravelComponent,
    DetailTravelComponent,
    CarouselComponent,
    ModifyTravelComponent
  ],
  imports: [
    CommonModule,
    TravelRoutingModule,
    HttpClientModule,
    NgbModalModule,
    NgbCarouselModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TravelModule { }
