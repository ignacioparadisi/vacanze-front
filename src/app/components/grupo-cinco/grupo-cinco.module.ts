import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoCincoRoutingModule } from './grupo-cinco-routing.module';
import { GrupoCincoComponent } from './grupo-cinco.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [GrupoCincoComponent],
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
  