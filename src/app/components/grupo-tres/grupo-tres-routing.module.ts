import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoTresComponent } from './grupo-tres.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoTresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoTresRoutingModule { }
