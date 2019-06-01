import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgModule } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule} from "@angular/forms";
import { ApiService} from '../../services/api.service';
import { Router } from '@angular/router';
import { Order } from '../../interfaces/Order';
import { environment as url } from '../../../environments/environment';


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
        private router: Router, private serv: ApiService) { }

    open(content) {
        
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    
    openPayment(content) {
        
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      document.getElementById("refere").hidden=true;
      document.getElementById("tarj").hidden=true;
      document.getElementById("dettarj").hidden=true;
      document.getElementById("detbank").hidden=true;
      document.getElementById("bank").hidden=true;
      document.getElementById("btnpay").hidden=true;
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

    public payMethods = [];
    public reserva = [];
    private orderList: Array<Order>;

    ngOnInit() {
     
        this.payMethods = this.getPaymentMethod();
        this.orderList = this.getOrderList();
        this.getOrders();
        this.open(this.content2);
        this.GetSubTotal();     
        this.GetComision();
        this.GetTotal();
        this.reserva = this.getReserva();
       
    }
    selectOption(id: number) {
        console.log(id);

             //TDC
            if (id==1)
            {
                document.getElementById("refere").hidden=true;
                document.getElementById("tarj").hidden=false;
                document.getElementById("dettarj").hidden=false;
                document.getElementById("detbank").hidden=true;
                document.getElementById("bank").hidden=true;
                document.getElementById("btnpay").hidden=false;
              
            }

            //TDB
            else  if (id==2)
            {
                document.getElementById("refere").hidden=true;
                // document.getElementById("bank").hidden=false;
                 document.getElementById("detbank").hidden=false;
                 document.getElementById("tarj").hidden=false;
                 document.getElementById("dettarj").hidden=true;
                 document.getElementById("bank").hidden=false;
                 document.getElementById("btnpay").hidden=false;
            }
              
              
              

              //EFEC
              else  if (id==3)
              {
                document.getElementById("refere").hidden=false;
                document.getElementById("tarj").hidden=true;
                document.getElementById("dettarj").hidden=true;
                document.getElementById("detbank").hidden=true;
                document.getElementById("bank").hidden=false;
                document.getElementById("btnpay").hidden=false;
              }


            //TRANS
            else  if (id==4)
            {
                document.getElementById("refere").hidden=false;
                document.getElementById("tarj").hidden=true;
                document.getElementById("dettarj").hidden=true;
                document.getElementById("detbank").hidden=true;
                document.getElementById("bank").hidden=true;
                document.getElementById("btnpay").hidden=false;

               
            }
            else
            {
                document.getElementById("refere").hidden=true;
                document.getElementById("tarj").hidden=true;
                document.getElementById("dettarj").hidden=true;
                document.getElementById("detbank").hidden=true;
                document.getElementById("bank").hidden=true;
                document.getElementById("btnpay").hidden=true;
            }
               
                

               

        
    }

    GetSubTotal()
    {
        var subTotal = this.getVariableOrders().reduce(function(prev, cur) {
            return prev + cur.price;
          }, 0);
          return subTotal;
    }

    GetComision()
    {     
          return this.GetSubTotal()*0.1;
    }
    GetTotal()
    {     
          return this.GetSubTotal()+ this.GetComision();
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
        return[
          { "id": 1,"image":"", "descrip": "Crucero mar caribe", "qty":5, "price":25000,"priceTotal":25000, "brand": "Royal Caribean" },
          { "id": 2, "image":"", "descrip": "Habitacion master Hilton","qty":3, "price":50000,"priceTotal":25000,"brand": "Hilton ca" },
          { "id": 3, "image":"", "descrip": "Camioneta 4x4","qty":1,"price":12500,"priceTotal":25000, "brand": "Hertz" },
        ];
      }
      getReserva() {
        return [
          { "id": 1, "name": "re1" },
          { "id": 2, "name": "re2" },
          { "id": 3, "name": "ree3" },
          { "id": 4, "name": "aaaa" }
        ];
      }



  public getOrders(){

    this.serv.getUrl(url.endpoint.default._get.Orders,['1','3'])
      .then(response => {
        this.setOrderList(response);
      })
      .catch(error => {
        return 
      })
  }

  public setOrderList(orderList: Array<Order>){
   
    this.orderList = orderList;

  }
  public getVariableOrders(): Array<Order>{
    return this.orderList;
  }





}
