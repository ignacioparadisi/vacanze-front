import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

// El componente principal carga de forma Lazy el Layout.
const routes: Routes = [
  { path: "", loadChildren: "./layout/layout.module#LayoutModule" }
  //{ path: "", loadChildren: "./components/grupo-uno/grupo-uno.module#GrupoUnoModule" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}