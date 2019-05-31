import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoCatorceRestaurantComponent } from './grupo-catorce-restaurant.component'

import { BuscarRestaurantComponent } from './buscar-restaurant/buscar-restaurant.component'
import { SeleccionarRestaurantComponent } from './seleccionar-restaurant/seleccionar-restaurant.component'

const routes: Routes = [
  {
      path: '',
      component: GrupoCatorceRestaurantComponent
  },
  {path:'list-restaurant',component:SeleccionarRestaurantComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GrupoCatorceRestaurantRoutingModule{ }