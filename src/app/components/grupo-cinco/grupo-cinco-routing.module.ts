import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoCincoComponent } from './grupo-cinco.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoCincoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoCincoRoutingModule {}
