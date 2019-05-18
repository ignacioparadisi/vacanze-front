import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoOchoCrucerosComponent } from './grupo-ocho-cruceros.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoOchoCrucerosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoOchoCrucerosRoutingModule {}