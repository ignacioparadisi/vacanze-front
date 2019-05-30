import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { GrupoTreceRoutingModule } from './grupo-trece.routing.module';
import { AutomovilGrupoTrece } from '../grupo-trece/automovil/grupo-trece.automovil';
import { HabitacionGrupoTrece } from '../grupo-trece/habitacion/grupo-trece.habitacion';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [AutomovilGrupoTrece, HabitacionGrupoTrece],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        NgSelectModule,
        ReactiveFormsModule,
        SweetAlert2Module.forRoot(),
        GrupoTreceRoutingModule
    ],
    providers: []
})
export class GrupoTreceModule { }
