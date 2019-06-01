import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisReservas } from './mis-reservas';

const routes: Routes = [
    { path: '', component: MisReservas, pathMatch: 'full'  },
    { path: ''},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MisReservasRoutingModule { }