import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GrupoOncePagoService } from 'src/app/services/grupo-once-pago/grupo-once-pago.service';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-grupo-once-pago',
    templateUrl: './grupo-once-pago.component.html',
    styleUrls: ['./grupo-once-pago.component.scss']

})
export class GrupoOncePagoComponent implements OnInit {

    closeResult: string;
    selected: number = 0;


    constructor(private modalService: NgbModal,
        private _grupooncepagoSerivce: GrupoOncePagoService, public fb: FormBuilder) { }

    open(content) {
        
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
    public orderList = [];
    

    ngOnInit() {

        this.payMethods = this._grupooncepagoSerivce.getPaymentMethod();
        this.orderList = this._grupooncepagoSerivce.getOrderList();
        this.GetSubTotal();
        this.GetComision();
        this.GetTotal();
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
        var subTotal = this._grupooncepagoSerivce.getOrderList().reduce(function(prev, cur) {
            return prev + cur.precio;
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







}
