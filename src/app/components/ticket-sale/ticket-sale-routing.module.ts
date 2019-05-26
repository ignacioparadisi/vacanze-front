import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketSaleComponent } from './ticket-sale.component';

const routes: Routes = [
  {
      path: '',
      component: TicketSaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketSaleRoutingModule {}