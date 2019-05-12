import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewGrupoTres } from '../grupo-tres/pages/new/new.grupo-tres';
import { ListGrupoTres } from '../grupo-tres/pages/list/list.grupo-tres';

const routes: Routes = [
  { path: 'creacion', component: NewGrupoTres, pathMatch: 'full' },
  { path: 'listado', component: ListGrupoTres, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoTresRoutingModule { }
