import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoTreceAutomovilDetalleComponent } from './grupo-trece-automovil-detalle.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoTreceAutomovilDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GrupoTreceAutomovilDetalleRoutingModule {}
