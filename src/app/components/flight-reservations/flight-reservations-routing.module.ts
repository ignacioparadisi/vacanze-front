import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightReservationsComponent } from './flight-reservations.component';

const routes: Routes = [
  {
      path: '',
      component: FlightReservationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightReservationsRoutingModule {}