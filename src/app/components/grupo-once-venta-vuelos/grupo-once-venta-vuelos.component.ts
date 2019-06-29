import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-grupo-once-venta-vuelos',
  templateUrl: './grupo-once-venta-vuelos.component.html',
  styleUrls: ['./grupo-once-venta-vuelos.component.scss']
  
})
export class GrupoOnceVentaVuelosComponent implements OnInit {

  selectedItem: any = '';
  inputChanged: any = '';
  wikiItems: any[] = [];
  items2: any[] = [{id: 0, payload: {label: 'Tom'}},
    {id: 1, payload: {label: 'John'}},
    {id: 2, payload: {label: 'Lisa'}},
    {id: 3, payload: {label: 'Js'}},
    {id: 4, payload: {label: 'Java'}},
    {id: 5, payload: {label: 'c'}},
    {id: 6, payload: {label: 'vc'}}
  ];
  config2: any = {'max': 5, 'placeholder': 'test', 'sourceField': ['payload', 'label']};
 
  constructor() {}
 
  onSelect(item: any) {
    this.selectedItem = item;
  }
 
  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }
 
  search (term: string) {
    
  }
  ngOnInit() {
    
  }
}
