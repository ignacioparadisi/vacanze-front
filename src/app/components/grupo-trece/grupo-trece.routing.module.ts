import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomovilGrupoTrece } from '../grupo-trece/automovil/grupo-trece.automovil';
import { HabitacionGrupoTrece } from '../grupo-trece/habitacion/grupo-trece.habitacion';

const routes: Routes = [
    { path: 'automovil', component: AutomovilGrupoTrece, pathMatch: 'full' },
    { path: 'habitacion', component: HabitacionGrupoTrece, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GrupoTreceRoutingModule { }
