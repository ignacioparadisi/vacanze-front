import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { MisReservasRoutingModule } from './mis-reservas.routing.module';
import { MisReservas } from './mis-reservas';
import { ReactiveFormsModule } from '@angular/forms';
import { TableResponsiveReservasModule  } from "../../blocks/table-responsive-reservas/table-responsive-reservas.module";


@NgModule({
    declarations: [MisReservas],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        NgSelectModule,
        ReactiveFormsModule,
        SweetAlert2Module.forRoot(),
        MisReservasRoutingModule,
        TableResponsiveReservasModule
    ],
    providers: []
})
export class MisReservasModule { }
