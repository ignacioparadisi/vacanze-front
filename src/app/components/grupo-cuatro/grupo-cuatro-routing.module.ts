import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketListFlightComponent } from './ticket-list-flight/ticket-list-flight.component';
import { TicketSaleFlightComponent } from './ticket-sale-flight/ticket-sale-flight.component';
import { CheckInComponent } from './check-in/check-in.component';
import { TicketSaleShipComponent } from './ticket-sale-ship/ticket-sale-ship.component';

const routes: Routes = [

          {path:'check-in',component:CheckInComponent, pathMatch: 'full'  },
          {path:'ticket-sale-ship',component:TicketSaleShipComponent, pathMatch: 'full' },
          {path:'ticket-list-flight',component:TicketListFlightComponent, pathMatch: 'full' },
          {path:'ticket-sale-flight',component:TicketSaleFlightComponent, pathMatch: 'full' }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoCuatroRoutingModule {}