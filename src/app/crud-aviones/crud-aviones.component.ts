import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-crud-aviones',
  templateUrl: './crud-aviones.component.html',
  styleUrls: ['./crud-aviones.component.scss']
})
export class CrudAvionesComponent implements OnInit {

  public tableData1: TableData;
  public tableData2: TableData;

  alerts: any[] = [{
    type: 'info',
    msg: `¡Bienvenido al módulo para la gestión de aviones!`,
    timeout: 4000
  }];

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit() {
      this.tableData1 = {
          headerRow: [ 'ID', 'Nombre', 'Modelo', 'Placa', 'Precio', 'Acciones'],
          dataRows: [
              ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
              ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
              ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
              ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
              ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
              ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
          ]
      };
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  editar(){
    this.modalRef.hide();
    this.add();
  }

  add(): void {
    this.alerts.push({
      type: 'warning',
      msg: `¡La acción fue realizada éxitosamente!`,
      timeout: 3000
    });
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

}
