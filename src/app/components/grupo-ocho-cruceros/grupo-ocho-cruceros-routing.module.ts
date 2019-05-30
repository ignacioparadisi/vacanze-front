import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrucerosComponent } from './cruceros/cruceros.component';
import { GrupoOchoCrucerosComponent } from './grupo-ocho-cruceros.component';
import { RegistrarCruceroComponent } from './registrar-crucero/registrar-crucero.component';
/* import { EditarCruceroComponent } from './editar-crucero/editar-crucero.component'; */

const routes: Routes = [
  {
      path: '',
      component: GrupoOchoCrucerosComponent,
      children: [
        {
          path: 'agregar-crucero',
          component: RegistrarCruceroComponent
        },
        {
          path: 'editar-crucero/:id',
          component: RegistrarCruceroComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoOchoCrucerosRoutingModule {}