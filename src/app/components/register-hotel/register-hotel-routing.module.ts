import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterHotelComponent } from './register-hotel.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterHotelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterHotelRoutingModule { }
