import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EditRestaurantModule } from '../../components/restaurantes/edit-restaurant/edit-restaurant.module';
import { RegisterRestaurantModule } from '../../components/restaurantes/register-restaurant/register-restaurant.module';
import { CommonModule } from "@angular/common";
import { TableResponsiveComponent } from './table-responsive.component';

@NgModule({
    declarations: [TableResponsiveComponent],
    imports: [
        CommonModule,
        RegisterRestaurantModule,
        EditRestaurantModule
    ],
    providers: [],
    exports: [TableResponsiveComponent]
})
export class TableResponsiveModule { }