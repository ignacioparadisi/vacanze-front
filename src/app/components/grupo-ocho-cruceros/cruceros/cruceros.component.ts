import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { environment as url } from '../../../../environments/environment';

@Component({
  selector: 'app-cruceros',
  templateUrl: './cruceros.component.html',
  styleUrls: ['./cruceros.component.scss'],
  providers: [ApiService]
})
export class CrucerosComponent implements OnChanges {

  private tableBoatsHeader: Array<String>;
  private headerTitle: string;

  @Input() cruisers;
  @Input() headers;

  @Output() emitRouting = new EventEmitter();
  @Output() actionAlertEventEmitter = new EventEmitter();

  constructor(private api: ApiService) { 
    this.headerTitle = "Lista de cruceros";
  }

  ngOnChanges() {}

  public getHeaderTitle(){
    return this.headerTitle;
  }

  public getCurrentRoute(route){
    this.emitRouting.emit(route);
  }

  public getDeleteAlert(data){
    this.actionAlertEventEmitter.emit(data);
  }

}
