import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelComponent } from './travel.component';
import { DetailTravelComponent } from './detail-travel/detail-travel.component';
import { CitiesTravelComponent } from './cities-travel/cities-travel.component';
import { DiaryTravelComponent } from './diary-travel/diary-travel.component';

const routes: Routes = [
  {
      path: '',
      component: TravelComponent
  },
  {
    path: ':travelId/cities',
    component: CitiesTravelComponent
  },
  {
    path: ':travelId/city/:cityId',
    component: DetailTravelComponent
  },
  {
    path: ':travelId/city/:cityId/diary',
    component: DiaryTravelComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelRoutingModule { }
