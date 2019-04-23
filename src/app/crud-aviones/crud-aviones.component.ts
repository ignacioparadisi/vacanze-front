import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

  showNotification(from, align,numero) {
    const type = ['','info','success','warning','danger'];
    if (numero == 2) {
      this.modalRef.hide();
    }

    $.notify({
        icon: 'pe-7s-config',
        message: 'La <b>acción</b> se realizó éxitosamente',
      }, {
        type: type[numero],
        timer: 1000,
        placement: {
            from: from,
            align: align
        }
      });
  }

}
