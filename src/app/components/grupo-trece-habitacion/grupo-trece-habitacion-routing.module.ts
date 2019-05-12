import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoTreceHabitacionComponent } from './grupo-trece-habitacion.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoTreceHabitacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoTreceHabitacionRoutingModule {}
