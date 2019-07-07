import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { environment as url } from '../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  selector: 'app-grupo-once-venta-vuelos',
  templateUrl: './grupo-once-venta-vuelos.component.html',
  styleUrls: ['./grupo-once-venta-vuelos.component.scss']

})
export class GrupoOnceVentaVuelosComponent implements OnInit {

  selectedOrigin: any = '';
  org: any = '';
  dest: any = '';
  datearr: any = '';
  datedep: any = '';

  selectedDestination: any = '';
  selectedPassennger: any = '';
  inputChanged: any = '';
  items2: Array<any>;
  config2: any = { 'max': 10, 'placeholder': 'test', 'sourceField': ['city'] };
  ida: any = '2013-01-01';
  vuelta: any = '2013-01-01';
  today: Date;
  resultFlight: Array<any>;
  constructor(private serv: ApiService, private modalService: NgbModal) { }

  onSelectOrigin(item: any) {
    this.selectedOrigin = item.id;
    //console.log(this.selectedOrigin);
  }
  onSelectedDestination(item: any) {
    this.selectedDestination = item.id;
    //console.log(this.selectedDestination);
  }
  onSelectedIda(item: any) {
    this.ida = item;
  }
  onSelectedVuelta(item: any) {
    this.vuelta = item;
  }
  onSelectedPassennger(item: any) {
    this.selectedPassennger = item;
    //console.log(this.selectedPassennger);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  search(term: string) {

  }

  public fillCountry() {

    this.serv.getUrl(url.endpoint.default._get.getLocations)
      .then(response => {
        this.setCountry(response);
      })
      .catch(error => {
        this.alertErrror("Ocurrio un error al cargar las ciudades")
      })

  }
  public SearchFlight() {
    console.log(this.selectedOrigin);
    console.log(this.selectedDestination);
    console.log(this.ida);
    console.log(this.vuelta);



    this.serv.getUrl(url.endpoint.default._get.getListFlightSale+
      "?origin="+ this.selectedOrigin+
      "&destination="+ this.selectedDestination+
      "&dateArrival="+ this.ida+
      "&dateDeparute="+ this.vuelta
      )
      .then(response => {
        this.fillTableResult(response);
      })
      .catch(error => {
        this.alertErrror("Ocurrio un error al buscar")
      })

  }
  public setCountry(country: Array<any>) {

    this.items2 = country;
  }

  private alertSucces(message: string) {
    let config: SweetAlertOptions = {
      title: message,
      type: 'success',
      showConfirmButton: true,
      timer: 5000
    }
    Swal.fire(config).then(result => {
    });
  }

  private alertErrror(error: string) {
    let config: SweetAlertOptions = {
      title: error,
      type: 'error',
      showConfirmButton: false,
      timer: 3000
    }
    Swal.fire(config).then(result => {
    });
  }

  public fillTableResult(result: Array<any>)
  {
    this.resultFlight = result;
  }
  ngOnInit() {
    this.fillCountry();
  }
}
