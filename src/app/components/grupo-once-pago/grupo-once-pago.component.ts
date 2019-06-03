import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgModule } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule } from "@angular/forms";
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Order } from '../../interfaces/Order';
import { environment as url } from '../../../environments/environment';
import { PayMethods } from '../../interfaces/paymethods';
import { Bill } from '../../interfaces/bill';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-grupo-once-pago',
  templateUrl: './grupo-once-pago.component.html',
  styleUrls: ['./grupo-once-pago.component.scss'],
  providers: [ApiService]


})

export class GrupoOncePagoComponent implements OnInit {

  closeResult: string;
  selected: number = 0;
  @ViewChild('content2') content2: ElementRef

  constructor(private modalService: NgbModal, public fb: FormBuilder,
    private router: Router, private serv: ApiService, private localStorage: LocalStorageService) { }

  open(content) {

    this.getAutomobileReservations()
    this.getHabservations()
    this.getRestervations();

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.idSelectAuto = '0';
    this.idSelectHab = '0';
    this.idSelectRes = '0';
    this.idSelectCru = '0';
    this.reference = '0|0|0|0';
  }

  openPayment(content) {
    if (this.orderList.length > 0) {

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
    } else {
      this.transactionDeclinedC("Debe seleccionar una reserva");
    }
  }

  openMyPayment() {


    this.localStorage.getItem("id").subscribe(data => {
      if (data) {
        this.userId = data
        this.getMyPayments();
      }
    })
    if (document.getElementById("mypayment").hidden) {
      document.getElementById("mypayment").hidden = false;
    } else {
      document.getElementById("mypayment").hidden = true;
    }



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


  public reservaAuto = [];
  public reservaHab = [];
  public reservaRes = [];
  public reservaCru = [];
  public myPayments = [];
  public idSelectAuto: string;
  public idSelectHab: string;
  public idSelectRes: string;
  public idSelectCru: string;

  private orderList: Array<Order>;
  public payMethods: Array<PayMethods>;
  public bill: Bill;
  public idMethod: string;
  private reference: string;
  private userId: string;
  ngOnInit() {
    document.getElementById("mypayment").hidden = true;

    this.localStorage.getItem("id").subscribe(data => {
      if (data) {
        this.userId = data
        this.open(this.content2);
      }
    })
    //console.log(this.userId);

    this.payMethods = this.getPaymentMethod();
    this.orderList = this.getOrderList();
    //this.reservaAuto = this.getReserv_Auto();
    //this.reservaHab = this.getReserv_Hab();
    //this.reservaRes = this.getReserv_Res();
    this.reservaCru = this.getReserv_Cru();




    //this.getOrders();
    this.getPayMethods();
    this.GetSubTotal();
    this.GetComision();
    this.GetTotal();

  }



  selectOptionResAuto(id: string) {
    this.idSelectAuto = id;
  }
  selectOptionResHab(id: string) {
    this.idSelectHab = id;
  }
  selectOptionResRes(id: string) {
    this.idSelectRes = id;
  }
  selectOptionResCru(id: string) {
    this.idSelectCru = id;
  }


  selectOption(id: number) {

    this.idMethod = name;
    console.log(name)
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

  GetSubTotal() {
    var subTotal = this.getVariableOrders().reduce(function (prev, cur) {
      return prev + cur.price;
    }, 0);
    return subTotal;
  }

  GetComision() {
    return this.GetSubTotal() * 0.1;
  }
  GetTotal() {
    return this.GetSubTotal() + this.GetComision();
  }

  getPaymentMethod() {
    return [
      { "id": 1, "name": "TDC" },
      { "id": 2, "name": "TDB" },
      { "id": 3, "name": "TRANS" },
      { "id": 4, "name": "EF" }
    ];
  }
  getOrderList() {
    return [
      { "id": 1, "image": "", "descrip": "Crucero mar caribe", "qty": 5, "price": 25000, "priceTotal": 25000, "brand": "Royal Caribean" },
      { "id": 2, "image": "", "descrip": "Habitacion master Hilton", "qty": 3, "price": 50000, "priceTotal": 25000, "brand": "Hilton ca" },
      { "id": 3, "image": "", "descrip": "Camioneta 4x4", "qty": 1, "price": 12500, "priceTotal": 25000, "brand": "Hertz" },
    ];
  }

  getReserv_Auto() {
    return [
      { "id": 2523, "name": "Auto1" },
      { "id": 2524, "name": "Auto2" },
      { "id": 2525, "name": "Auto3" },
      { "id": 2526, "name": "Auto4" }
    ];
  }
  getReserv_Hab() {
    return [
      { "id": 102, "name": "hab1" },
      { "id": 103, "name": "hab2" },
      { "id": 104, "name": "hab3" },
      { "id": 105, "name": "hab4" }
    ];
  }
  getReserv_Res() {
    return [
      { "id": 1, "name": "re1" },
      { "id": 2, "name": "re2" },
      { "id": 3, "name": "ree3" },
      { "id": 4, "name": "aaaa" }
    ];
  }
  getReserv_Cru() {
    return [
      { "id": 1, "name": "re1" },
      { "id": 2, "name": "re2" },
      { "id": 3, "name": "ree3" },
      { "id": 4, "name": "aaaa" }
    ];
  }


  public getOrders() {

    this.serv.getUrl(url.endpoint.default._get.Orders, [this.idSelectAuto, this.idSelectHab, this.idSelectRes, this.idSelectCru])
      .then(response => {
        document.getElementById("orderframe").hidden = false;
        this.setOrderList(response);
        console.log(response);

      })
      .catch(error => {
        this.notInfoResponse()

      })
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }

  }

  public setOrderList(orderList: Array<Order>) {

    this.orderList = orderList;

  }
  public getVariableOrders(): Array<Order> {
    return this.orderList;
  }
  public getPayMethods() {

    this.serv.getUrl(url.endpoint.default._get.getPaymentMethod)
      .then(response => {
        this.setPayMethods(response);
      })
      .catch(error => {
        return
      })

  }

  public setPayMethods(paymethods: Array<PayMethods>) {
    this.payMethods = paymethods;
  }
  public getVariablePayMethods(): Array<PayMethods> {
    return this.payMethods;
  }

  public postPayment() {
    this.reference = this.idSelectAuto + "|" +
      this.idSelectHab + "|" +
      this.idSelectRes + "|" +
      this.idSelectCru;

    this.bill = { id: 100, paymentMethod: this.idMethod, reference: this.reference, total: this.GetTotal() };
    this.addPayment(this.bill);
  }
  public addPayment(bill: Bill) {
    console.log(bill)
    this.serv.postUrl(url.endpoint.default._post.addPayment, bill)
      .then(response => {
        //console.log("response", response);
        this.transactionApproved(response);
        if (this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
        }
        this.reservaAuto = [];
        this.reservaHab = [];
        this.orderList = [];
        this.getAutomobileReservations();
        this.getHabservations();
      })
      .catch((err: HttpErrorResponse) => {
        this.transactionDeclinedC(err.error)
        // console.log(err.error);
      })
  }

  public notInfoResponse() {
    this.setOrderList([]);
    document.getElementById("orderframe").hidden = true;
  }


  private transactionApproved(message: string) {
    let config: SweetAlertOptions = {
      title: message,
      type: 'success',
      showConfirmButton: true,
      timer: 5000
    }
    Swal.fire(config).then(result => {
      console.log(result);
    });
  }

  private transactionDeclinedC(error: string) {
    let config: SweetAlertOptions = {
      title: error,
      type: 'error',
      showConfirmButton: false,
      timer: 3000
    }
    Swal.fire(config).then(result => {
      console.log(result);
    });
  }

  /**********************************************************************
    * Metodo que es llamado para mostrar las reservas de ese usuario                          *
    ***********************************************************************/
  getAutomobileReservations() {
    console.log("Estoy en getAutomobileReservations");
    const requestURL = "payment/ResHabAuto/" + this.userId + "/0";
    //const requestURL = "reservationautomobiles/?user="+1; //Mientras se soluciona el peo
    this.serv.getUrl(requestURL).then(
      response => {
        console.log(response);
        this.reservaAuto = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getHabservations() {
    console.log("Estoy en getAutomobileReservations");

    const requestURL = "payment/ResHabAuto/" + this.userId + "/1";
    //const requestURL = "reservationautomobiles/?user="+1; //Mientras se soluciona el peo
    this.serv.getUrl(requestURL).then(
      response => {
        console.log(response);
        this, this.reservaHab = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getRestervations() {
    //console.log("Estoy en getAutomobileReservations");

    const requestURL = "payment/ResHabAuto/" + this.userId + "/2";
    //const requestURL = "reservationautomobiles/?user="+1; //Mientras se soluciona el peo
    this.serv.getUrl(requestURL).then(
      response => {
        console.log(response);
        this, this.reservaRes = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getMyPayments() {
    console.log("Estoy en getAutomobileReservations");

    const requestURL = "payment/mypayment/" + this.userId;
    //const requestURL = "reservationautomobiles/?user="+1; //Mientras se soluciona el peo
    this.serv.getUrl(requestURL).then(
      response => {
        console.log(response);
        this, this.myPayments = response;
      },
      error => {
        console.log(error);
      }
    );
  }
  public formatDate(sdate: Date) {
    var date = new Date(sdate)
    let formatted_date = date.getFullYear() + "-" +
      (date.getMonth() + 1) + "-" +
      date.getDate() + " " +
      date.getHours() + ":" +
      date.getMinutes() +
      ":" + date.getSeconds()
    return formatted_date;
  }

}
