import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TravelRoutingModule } from './travel-routing.module';
import { TravelComponent } from './travel.component';

@NgModule({
  declarations: [
    TravelComponent
  ],
  imports: [
    CommonModule,
    TravelRoutingModule,
    HttpClientModule
  ]
})
export class TravelModule { }
