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
    }
    selectOption(id: number) {
        console.log(id);

             //TDC
            if (id==1)
            {

              document.getElementById("refere").hidden=true;
              document.getElementById("tarj").hidden=false;
              document.getElementById("dettarj").hidden=false;
             // document.getElementById("bank").hidden=true;
            //  document.getElementById("pass").hidden=true;
            }

            //TDB
            else  if (id==2)
            {
                document.getElementById("refere").hidden=true;
                // document.getElementById("bank").hidden=false;
                // document.getElementById("pass").hidden=false;
                 document.getElementById("tarj").hidden=false;
                 document.getElementById("dettarj").hidden=true;
            }
              
              
              

              //EFEC
              else  if (id==3)
              {
                document.getElementById("refere").hidden=false;
                document.getElementById("tarj").hidden=true;
                document.getElementById("dettarj").hidden=true;
               // document.getElementById("bank").hidden=true;
               // document.getElementById("pass").hidden=true;
              }


            //TRANS
            else  if (id==4)
            {
                document.getElementById("refere").hidden=false;
                document.getElementById("tarj").hidden=true;
                document.getElementById("dettarj").hidden=true;
                //document.getElementById("bank").hidden=true;
               // document.getElementById("pass").hidden=true;
            }
            else
            {
                document.getElementById("refere").hidden=false;
                document.getElementById("tarj").hidden=false;
                document.getElementById("dettarj").hidden=false;
               // document.getElementById("bank").hidden=false;
               // document.getElementById("pass").hidden=false;
            }
               
                

               

        
    }





}
