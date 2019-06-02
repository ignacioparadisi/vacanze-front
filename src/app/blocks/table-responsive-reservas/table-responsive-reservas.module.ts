import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TableResponsiveReservasComponent } from '../table-responsive-reservas/table-responsive-reservas.component';

@NgModule({
    declarations: [TableResponsiveReservasComponent],
    imports: [
        CommonModule
    ],
    providers: [],
    exports: [TableResponsiveReservasComponent]
})
export class TableResponsiveReservasModule { }