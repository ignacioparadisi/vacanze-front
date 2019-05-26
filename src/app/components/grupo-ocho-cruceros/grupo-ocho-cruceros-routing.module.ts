import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HabitacionesComponent } from "./habitaciones/habitaciones.component";
import { CrucerosComponent } from './cruceros/cruceros.component';
import { GrupoOchoCrucerosComponent } from './grupo-ocho-cruceros.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoOchoCrucerosComponent,
      children: [
        {
          path: 'habitaciones',
          component: HabitacionesComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoOchoCrucerosRoutingModule {}