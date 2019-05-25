import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightReservationsComponent } from './flight-reservations.component';
import {ListReservationsComponent} from '../list-reservations/list-reservations.component';

const routes: Routes = [
  
  {path: '',component: FlightReservationsComponent},
  {path:'lists-reservations',component:ListReservationsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightReservationsRoutingModule {}