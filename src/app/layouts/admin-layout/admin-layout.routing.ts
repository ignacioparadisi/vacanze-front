import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { CrudAvionesComponent } from '../../crud-aviones/crud-aviones.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'crud-aviones',        component: CrudAvionesComponent },
];
