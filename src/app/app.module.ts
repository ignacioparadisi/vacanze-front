import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { AppRoutingModule } from "./app-routing.module";
import { FlightResrvationsComponent } from './flight-resrvations/flight-resrvations.component';
=======
import { AppRoutingModule } from './app-routing.module';
>>>>>>> c081c9b7ff79a4b75d32154e10b1a186a6fabff9

@NgModule({
  declarations: [
    AppComponent,
    FlightResrvationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
