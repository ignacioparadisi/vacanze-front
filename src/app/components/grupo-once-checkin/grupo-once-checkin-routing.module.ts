import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoOnceCheckinComponent } from './grupo-once-checkin.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoOnceCheckinComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoOnceCheckinRoutingModule { }
