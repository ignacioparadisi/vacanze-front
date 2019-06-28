import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{Consulta_autoComponent} from '../grupo-cinco/consultar_auto/consultar_auto';
import{Registrar_AutoComponent} from '../grupo-cinco/registrar_auto/registrar_auto';
 
const routes: Routes = [
  { path: 'consultar', component: Consulta_autoComponent },
  { path: 'registrar', component: Registrar_AutoComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoCincoRoutingModule {}
