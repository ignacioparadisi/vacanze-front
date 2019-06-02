import { NgModule } from '@angular/core';
import { LandingComponent } from './landing.component';
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [{
  path: 'landing',
  component: LandingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
