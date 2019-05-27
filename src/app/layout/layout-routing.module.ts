import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      /* Inicio */
      {
        path: '',
        loadChildren: '../components/home/home.module#HomeModule'
      },
      {
        path: 'grupo-uno',
        loadChildren: '../components/grupo-uno/grupo-uno.module#GrupoUnoModule'
      },
      {
        path: 'grupo-nueve',
        loadChildren: '../components/grupo-nueve/grupo-nueve.module#GrupoNueveModule'
      },
      {
        path: 'grupo-tres',
        loadChildren: '../components/grupo-tres/grupo-tres.module#GrupoTresModule'
      },
      {
        path: 'grupo-trece-habitacion',
        loadChildren:
          '../components/grupo-trece-habitacion/grupo-trece-habitacion.module#GrupoTreceHabitacionModule'
      },
      {
        path: 'grupo-trece-automovil',
        loadChildren:
          '../components/grupo-trece-automovil/grupo-trece-automovil.module#GrupoTreceAutomovilModule'
      },
      /* Ruta para Backoffice de Cruceros */
      {
        path: 'cruceros',
        loadChildren:
          '../components/grupo-ocho-cruceros/grupo-ocho-cruceros.module#GrupoOchoCrucerosModule'
      },
      {
        path: 'flight-reservations',
        loadChildren:
          '../components/flight-reservations/flight-reservations.module#FlightReservationsModule'
      },
      {
        path: 'flight-reservations',
        loadChildren: '../components/flight-reservations/flight-reservations.module#FlightReservationsModule'
      },
      {
        path: 'administrar-hoteles',
        loadChildren: '../components/view-hotels-backoffice/view-hotels-backoffice.module#ViewHotelsBackofficeModule'
      },
      {
        path: 'travel',
        loadChildren: '../components/travel/travel.module#TravelModule'
      },
      {
        path: 'grupo-once-pago',
        loadChildren:
          '../components/grupo-once-pago/grupo-once-pago.module#GrupoOncePagoModule'
      },
      {
        path: 'restaurantes',
        loadChildren:
          '../components/restaurantes/restaurantes.module#RestaurantesModule'
      },
      {
        path: 'users',
        loadChildren: '../components/users/users-list/users-list.module#UsersListModule'
      },
      {
        path: 'ticket-sale',
        loadChildren: '../components/ticket-sale/ticket-sale.module#TicketSaleModule'
      },
      {
        path: 'ticket-sale-ship',
        loadChildren: '../components/ticket-sale-ship/ticket-sale-ship.module#TicketSaleShipModule'
      },
      {
        path: 'check-in',
        loadChildren: '../components/check-in/check-in.module#CheckInModule'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
