import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrucerosComponent } from './cruceros/cruceros.component';
import { GrupoOchoCrucerosComponent } from './grupo-ocho-cruceros.component';
import { RegistrarCruceroComponent } from './registrar-crucero/registrar-crucero.component';
import { RutasComponent } from './rutas/rutas.component';
import { AgregarRutasComponent } from './agregar-rutas/agregar-rutas.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoOchoCrucerosComponent,
      children: [
        {
          path: 'add-cruiser',
          component: RegistrarCruceroComponent
        },
        {
          path: 'edit-cruiser/:id',
          component: RegistrarCruceroComponent
        },
        {
          path: ':id/layovers',
          component: RutasComponent
        },
        {
          path: 'add-cruiser-routes/:id',
          component: AgregarRutasComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoOchoCrucerosRoutingModule {}