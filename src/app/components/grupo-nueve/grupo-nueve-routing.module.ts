import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoNueveComponent } from './grupo-nueve.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoNueveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoNueveRoutingModule {}