import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import {LoginComponent} from "./components/grupo-uno/login/login.component";


// El componente principal carga de forma Lazy el Layout.
const routes: Routes = [
  { path: "", loadChildren: "./layout/layout.module#LayoutModule" },
  { path: "login", component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}