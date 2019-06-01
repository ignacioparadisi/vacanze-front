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
        path: 'grupo-trece',
        loadChildren: '../components/grupo-trece/grupo-trece.module#GrupoTreceModule'
      },
      {
        path: 'mis-reservas',
        loadChildren: '../components/mis-reservas/mis-reservas.module#MisReservasModule'
      },
      /* Ruta para Backoffice de Cruceros */
      {
        path: 'cruisers',
        loadChildren:
          '../components/grupo-ocho-cruceros/grupo-ocho-cruceros.module#GrupoOchoCrucerosModule'
      },
      {
        path: 'flight-reservations',
        loadChildren: '../components/grupo-doce-vuelos/flight-reservations/flight-reservations.module#FlightReservationsModule'
      },
      {
        path: 'administrar-hoteles',
        loadChildren: '../components/view-hotels-backoffice/view-hotels-backoffice.module#ViewHotelsBackofficeModule'
      },
      {
        path: 'administrar-restaurantes',
        loadChildren: '../components/grupo-siete-restaurantes/grupo-siete-restaurantes.module#GrupoSieteRestaurantesModule'
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
        path: 'restaurant-reservation',
        loadChildren:
        '../components/grupo-catorce-restaurant/grupo-catorce-restaurant.module#GrupoCatorceRestaurantModule'
      },
      {
        path: 'users',
        loadChildren: '../components/users/users-list/users-list.module#UsersListModule'
      },
      {
        path: 'grupo-cinco',
        loadChildren: '../components/grupo-cinco/grupo-cinco.module#GrupoCincoModule'
      },
      {
      path: 'grupo-cuatro',
        loadChildren: '../components/grupo-cuatro/grupo-cuatro.module#GrupoCuatroModule'
      }/* ,
      {
        path: 'ticket-sale-ship',
        loadChildren: '../components/ticket-sale-ship/ticket-sale-ship.module#TicketSaleShipModule'
      },
      {
        path: 'check-in',
        loadChildren: '../components/check-in/check-in.module#CheckInModule'
      } */
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
