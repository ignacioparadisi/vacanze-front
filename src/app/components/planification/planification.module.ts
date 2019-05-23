import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PlanificationRoutingModule } from './planification-routing.module';
import { PlanificationComponent } from './planification.component';

@NgModule({
  declarations: [
    PlanificationComponent
  ],
  imports: [
    CommonModule,
    PlanificationRoutingModule,
    HttpClientModule    
  ]
})
export class PlanificationModule { }
