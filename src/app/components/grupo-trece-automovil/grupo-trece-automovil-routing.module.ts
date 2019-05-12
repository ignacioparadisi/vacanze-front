import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoTreceAutomovilComponent } from './grupo-trece-automovil.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoTreceAutomovilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoTreceAutomovilRoutingModule {}
