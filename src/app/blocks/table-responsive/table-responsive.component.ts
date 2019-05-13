import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss']
})

export class TableResponsiveComponent implements OnChanges{

    @Input() headerTitle: string; // Nombre de la tabla ej: Listado de registros
    @Input() tableData: Array<Object>; // Array con la data a mostrar en cada fila de la tabla
    @Input() tableHeaders: Array<String>; // Array con los nombres de cada columna en la tabla
    @Input() type: string;

    constructor(){ // Agregando tooltip en boton de agregar
    }

    ngOnChanges(){ 
    }


}