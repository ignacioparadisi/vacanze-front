import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GrupoOncePagoService } from '../../services/grupo-once-pago/grupo-once-pago.service';


@Component({
  selector: 'app-grupo-once-pago',
  templateUrl: './grupo-once-pago.component.html',
  styleUrls: ['./grupo-once-pago.component.scss']
})
export class GrupoOncePagoComponent implements OnInit {

  closeResult: string;
  constructor(private modalService: NgbModal,
 private _grupooncepagoSerivce: GrupoOncePagoService
    
    
    ) { }

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
            return  `with: ${reason}`;
        }
    }

    public payMethods =[];
    public orderList =[];


  ngOnInit() {
      this.payMethods = this._grupooncepagoSerivce.getPaymentMethod();
      this.orderList = this._grupooncepagoSerivce.getOrderList();
  }

}
