import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoTreceHabitacionDetalleComponent } from './grupo-trece-habitacion-detalle.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoTreceHabitacionDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoTreceHabitacionDetalleRoutingModule {}
