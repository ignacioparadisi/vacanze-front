import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketSaleShipComponent } from './ticket-sale-ship.component';

const routes: Routes = [
  {
      path: '',
      component: TicketSaleShipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketSaleShipRoutingModule {}