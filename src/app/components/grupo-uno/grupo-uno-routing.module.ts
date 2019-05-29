import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoUnoComponent } from './grupo-uno.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
      path: '',
      component: GrupoUnoComponent
  },
  {
     path: 'landing',
     component: LandingComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoUnoRoutingModule {}
