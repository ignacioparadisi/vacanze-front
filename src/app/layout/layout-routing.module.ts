import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      /* Inicio */
      {
        path: '',
        loadChildren: '../components/home/home.module#HomeModule'
      },
      {
        path: 'grupo-uno',
        loadChildren: '../components/grupo-uno/grupo-uno.module#GrupoUnoModule'
      },
      {
        path: 'grupo-trece-habitacion',
        loadChildren: '../components/grupo-trece-habitacion/grupo-trece-habitacion.module#GrupoTreceHabitacionModule'
      },
      {
        path: 'grupo-trece-automovil',
        loadChildren: '../components/grupo-trece-automovil/grupo-trece-automovil.module#GrupoTreceAutomovilModule'
      },
      {
        path: 'grupo-trece-automovil-detalle',
        loadChildren: '../components/grupo-trece-automovil-detalle/grupo-trece-automovil-detalle.module#GrupoTreceAutomovilDetalleModule'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
