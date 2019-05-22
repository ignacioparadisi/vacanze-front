import { Component, Input, Output, OnChanges, EventEmitter, OnInit} from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-action-alerter',
  templateUrl: './action-alerter.component.html',
  styleUrls: ['./action-alerter.component.scss']
})
export class ActionAlerterComponent implements OnInit {

  //emisor de eventos del actionalerter
  @Output() public actionAlertEventEmitter = new EventEmitter();

  //configuracion del actionalerter definida traida desde table-responsive
  @Input() public configuration: SweetAlertOptions = {};

  //accion unica que se ejecuta sobre el registro (eliminar,desactivar)
  //traida desde table-responsive
  //no funciona para los modals de ediccion ya que esto es solo una alerta con confirmacion
  @Input() public action: string;

  constructor() {
  }

  ngOnInit() {
  }

  public confirmAction(){
    this.actionAlertEventEmitter.emit(this.action);
  }

}
