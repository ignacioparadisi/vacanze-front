import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoOnceCheckinRoutingModule } from './grupo-once-checkin-routing.module';
import { GrupoOnceCheckinComponent } from './grupo-once-checkin.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AutocompleteModule } from 'ng2-input-autocomplete';
@NgModule({
  declarations: [
    GrupoOnceCheckinComponent
  ],
  imports: [
    CommonModule,
    AutocompleteModule.forRoot(),
    GrupoOnceCheckinRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: []
})
export class GrupoOnceCheckinModule {}