import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewHotelsBackofficeComponent } from './view-hotels-backoffice.component';

const routes: Routes = [
  {
    path: '',
    component: ViewHotelsBackofficeComponent,
    children: [
      {
        path: 'agregar-hotel',
        loadChildren: '../register-hotel/register-hotel.module#RegisterHotelModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewHotelsBackofficeRoutingModule { }
