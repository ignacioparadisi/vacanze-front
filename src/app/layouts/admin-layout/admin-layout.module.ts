import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { CrudAvionesComponent } from '../../crud-aviones/crud-aviones.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    CrudAvionesComponent
  ]
})

export class AdminLayoutModule {}
