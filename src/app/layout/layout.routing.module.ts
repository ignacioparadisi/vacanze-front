import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { LayoutComponent } from './layout.component';

/***************************************************************************************
* Todos los modulos seran renderizados de forma lazy.                                  *
* Esto significa que solo seran cargados en el navegador cuando se solicite por ellos. *
* A menos que se destruyan en algún de la aplicacion                                   *
****************************************************************************************/
const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
            /* Componente para renderizar el home */
            {
                path: '',
                loadChildren: '../components/home/home.module#HomeModule',
            }
            // Debajo de este objeto, iran todos los modulos a cargar.
        ]
    
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
