import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoOncePagoComponent } from './grupo-once-pago.component';
const routes: Routes = [
  {
      path: '',
      component: GrupoOncePagoComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoOncePagoRoutingModule { }
