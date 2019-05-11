import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { VentaBoletoComponent } from './components/venta-boleto/venta-boleto.component';

// El componente principal carga de forma Lazy el Layout.
const routes: Routes = [
  { path: "", loadChildren: "./layout/layout.module#LayoutModule" },
  { path: 'venta-boleto', component: VentaBoletoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}