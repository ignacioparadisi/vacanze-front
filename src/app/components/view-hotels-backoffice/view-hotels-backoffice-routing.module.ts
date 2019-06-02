import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewHotelsBackofficeComponent } from './view-hotels-backoffice.component';
import { RegisterHotelComponent } from './register-hotel/register-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';

const routes: Routes = [
  {
    path: '',
    component: ViewHotelsBackofficeComponent,
    children: [
      {
        path: 'agregar-hotel',
        component: RegisterHotelComponent
      },
      {
        path: 'editar-hotel/:id',
        component: EditHotelComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewHotelsBackofficeRoutingModule { }
