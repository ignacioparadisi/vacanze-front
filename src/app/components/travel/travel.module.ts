import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TravelRoutingModule } from './travel-routing.module';
import { TravelComponent } from './travel.component';
import { CreateTravelComponent } from './create-travel/create-travel';
import { NgbModalModule, NgbDatepickerModule, NgbTabsetModule } from "@ng-bootstrap/ng-bootstrap";
import { DetailTravelComponent } from './detail-travel/detail-travel.component';
import { ModifyTravelComponent } from './modify-travel/modify-travel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitiesTravelComponent } from './cities-travel/cities-travel.component';
import { AddCityComponent } from './cities-travel/add-city/add-city';
import { DiaryTravelComponent } from './diary-travel/diary-travel.component';

@NgModule({
  declarations: [
    TravelComponent,
    CreateTravelComponent,
    DetailTravelComponent,
    ModifyTravelComponent,
    CitiesTravelComponent,
    AddCityComponent,
    DiaryTravelComponent
  ],
  imports: [
    CommonModule,
    TravelRoutingModule,
    HttpClientModule,
    NgbModalModule,
    NgbTabsetModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ]
})
export class TravelModule { }
