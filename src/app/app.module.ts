import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { GrupoOncePagoComponent } from './components/grupo-once-pago/grupo-once-pago.component';



@NgModule({
  declarations: [
    AppComponent,
    GrupoOncePagoComponent  ],
    imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
