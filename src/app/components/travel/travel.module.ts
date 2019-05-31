import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TravelRoutingModule } from './travel-routing.module';
import { TravelComponent } from './travel.component';
import { CreateTravelComponent } from './create-travel/create-travel';
import { NgbModalModule, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { DetailTravelComponent } from './detail-travel/detail-travel.component';
import { CarouselComponent } from './detail-travel/carousel/carousel.component';
import { ModifyTravelComponent } from './modify-travel/modify-travel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitiesTravelComponent } from './cities-travel/cities-travel.component';
import { AddCityComponent } from './cities-travel/add-city/add-city';

@NgModule({
  declarations: [
    TravelComponent,
    CreateTravelComponent,
    DetailTravelComponent,
    CarouselComponent,
    ModifyTravelComponent,
    CitiesTravelComponent,
    AddCityComponent
  ],
  imports: [
    CommonModule,
    TravelRoutingModule,
    HttpClientModule,
    NgbModalModule,
    NgbCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ]
})
export class TravelModule { }
