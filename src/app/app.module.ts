<<<<<<< HEAD
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
=======
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
>>>>>>> ed876fb0b3faf408c699f5e282e21228d1139402
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
