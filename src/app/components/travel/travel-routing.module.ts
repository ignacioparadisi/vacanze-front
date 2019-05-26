import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelComponent } from './travel.component';
import { DetailTravelComponent } from './detail-travel/detail-travel.component';
const routes: Routes = [
  {
      path: '',
      component: TravelComponent
  },
  {
    path: ':id',
    component: DetailTravelComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelRoutingModule { }
