import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoCincoRoutingModule } from './grupo-cinco-routing.module';
import { Consulta_autoComponent } from '../grupo-cinco/consultar_auto/consultar_auto';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Registrar_AutoComponent} from '../grupo-cinco/registrar_auto/registrar_auto'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [Consulta_autoComponent,Registrar_AutoComponent],
    imports: [
      CommonModule,
      GrupoCincoRoutingModule,
      HttpClientModule,
      NgbModule,
      FormsModule,
      SweetAlert2Module.forRoot(),
      ReactiveFormsModule
    ],
    providers: []
  })
  export class GrupoCincoModule {}
  