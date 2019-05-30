import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoSieteRestaurantesComponent } from './grupo-siete-restaurantes.component';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: GrupoSieteRestaurantesComponent,
    children: [
      {
        path: 'agregar-restaurant',
        component: RegisterRestaurantComponent
      },
      {
        path: 'editar-restaurant',
        component: EditRestaurantComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoSieteRestaurantesRoutingModule { }
