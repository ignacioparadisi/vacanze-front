import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoOnceVentaVuelosComponent } from './grupo-once-venta-vuelos.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoOnceVentaVuelosComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoOnceVentaVuelosRoutingModule { }
