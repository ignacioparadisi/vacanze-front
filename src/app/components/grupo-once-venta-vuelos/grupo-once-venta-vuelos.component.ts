import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { environment as url } from '../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PayMethods } from '../../interfaces/paymethods';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { LocalStorageService } from '../../services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
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

  fldName: any = '';
  fldId:   any = '';
  fldSeat: any = '';
  fldObs:  any = '';
  private userId: string;

  selectedDestination: any = '';
  selectedPassennger: any = '';
  selectedFlight: any = '';
  inputChanged: any = '';
  items2: Array<any>;
  config2: any = { 'max': 10, 'placeholder': 'test', 'sourceField': ['city'] };
  ida: any = '2013-01-01';
  vuelta: any = '2013-01-01';
  today: Date;
  resultFlight: Array<any>;
  passengers: Array<any>;
  Savepassengers: Array<any>=[];
  constructor(private serv: ApiService, 
    private modalService: NgbModal,
    private localStorage: LocalStorageService) { }
  closeResult: string;

  public payMethods: Array<PayMethods>;
  public idMethod: string;


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
    
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  open(content) {
   

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    document.getElementById("refere").hidden = true;
    document.getElementById("tarj").hidden = true;
    document.getElementById("dettarj").hidden = true;
    document.getElementById("detbank").hidden = true;
    document.getElementById("bank").hidden = true;
    document.getElementById("btnpay").hidden = true;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  public DrawListPassengers()
  {
    this.passengers=[];
    this.Savepassengers =[];
    for (var i = 0; i < this.selectedPassennger; i++) 
    {

     this.passengers.push({id:"", name:"", seat:"", observ: ""});
    }

  }
  public SelectFlightTobuy(item: any)
  {
    this.DrawListPassengers();
    this.selectedFlight = item;
    document.getElementById("BtnComprar").hidden = false;
  }

//Modulos de pago
getPaymentMethod() {
  return [
    { "id": 1, "name": "TDC" },
    { "id": 2, "name": "TDB" },
    { "id": 3, "name": "TRANS" },
    { "id": 4, "name": "EF" }
  ];
}

selectOption(id: number) {

  this.idMethod = name;
  //TDC
  if (id == 1) {
    this.idMethod = "CREDITO";
    document.getElementById("refere").hidden = true;
    document.getElementById("tarj").hidden = false;
    document.getElementById("dettarj").hidden = false;
    document.getElementById("detbank").hidden = true;
    document.getElementById("bank").hidden = true;
    document.getElementById("btnpay").hidden = false;

  }

  //TDB
  else if (id == 2) {
    this.idMethod = "DEBITO";
    document.getElementById("refere").hidden = true;
    document.getElementById("detbank").hidden = false;
    document.getElementById("tarj").hidden = false;
    document.getElementById("dettarj").hidden = true;
    document.getElementById("bank").hidden = false;
    document.getElementById("btnpay").hidden = false;
  }




  //TRANSFERENCIA
  else if (id == 3) {
    this.idMethod = "TRANSFERENCIA";
    document.getElementById("refere").hidden = false;
    document.getElementById("tarj").hidden = true;
    document.getElementById("dettarj").hidden = true;
    document.getElementById("detbank").hidden = true;
    document.getElementById("bank").hidden = false;
    document.getElementById("btnpay").hidden = false;
  }


  //EFECTIVO
  else if (id == 4) {
    this.idMethod = "EFECTIVO";
    document.getElementById("refere").hidden = false;
    document.getElementById("tarj").hidden = true;
    document.getElementById("dettarj").hidden = true;
    document.getElementById("detbank").hidden = true;
    document.getElementById("bank").hidden = true;
    document.getElementById("btnpay").hidden = false;


  }
  else {
    document.getElementById("refere").hidden = true;
    document.getElementById("tarj").hidden = true;
    document.getElementById("dettarj").hidden = true;
    document.getElementById("detbank").hidden = true;
    document.getElementById("bank").hidden = true;
    document.getElementById("btnpay").hidden = true;
  }

}

public GetIdField(item: any){this.fldId = item}
public GetNombreField(item: any){this.fldName = item}
public GetSeatField(item: any){this.fldSeat = item}

public GetObsField(item: any)
{
  this.fldObs = item

  console.log(this.fldId);
  console.log(this.fldSeat);
  console.log(this.fldName);
  console.log(this.fldObs);
  this.Savepassengers.push({id:this.fldId,
     name:this.fldSeat,
     seat:this.fldName,
     observ: this.fldObs,
     fli: this.selectedFlight.id,
     user: this.userId,
     pay: 1,
     numps:3
    })
  console.log(this.Savepassengers);
}
public postPayment()
{
  this.serv.postUrl(url.endpoint.default._get.getListFlightSale, this.Savepassengers)
  .then(response => {
    this.alertSucces(response);
  })
  .catch((err: HttpErrorResponse) => {
    this.alertErrror(err.error)
  })
}



  ngOnInit() {

    this.localStorage.getItem("id").subscribe(data => {
      if (data) {
        this.userId = data;
      }
    })

    this.fillCountry();
    this.selectedPassennger=1;


    //pagos
    this.payMethods = this.getPaymentMethod();

    //PRUEBAS
    this.ida ="2019-03-01"
    this.vuelta ="2019-03-01"
    this.selectedDestination=6;
    this.selectedOrigin=5;
    
    document.getElementById("BtnComprar").hidden = true;
  }
}
