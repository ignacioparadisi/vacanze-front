import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TableResponsiveComponent } from './table-responsive.component';

@NgModule({
    declarations: [TableResponsiveComponent],
    imports: [
        CommonModule
    ],
    providers: [],
    exports: [TableResponsiveComponent]
})
export class TableResponsiveModule { }