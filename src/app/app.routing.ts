/************************************************************************
* Routing principal de la aplicacion donde se carga el módulo de Layout *
*************************************************************************/
import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

// Al llegar por la URL a "/" carga automaticamente el layout.
const routes: Routes = [
  { path: "", loadChildren: "./layout/layout.module#LayoutModule" }
];
// RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) PreloadAllModules

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) // Necesario para la estrategia de Lazy Load.
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
