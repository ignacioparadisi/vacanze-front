import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { FlightResrvationsComponent } from './components/flight-resrvations/flight-resrvations.component';
import { FlightReservationsComponent } from './components/flight-reservations/flight-reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightResrvationsComponent,
    FlightReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
