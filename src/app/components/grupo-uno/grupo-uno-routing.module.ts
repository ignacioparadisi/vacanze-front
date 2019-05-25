import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoUnoComponent } from './grupo-uno.component';

const routes: Routes = [
  {
    path: '',
    component: GrupoUnoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoUnoRoutingModule { }
