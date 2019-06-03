import { ApiService } from "../../../services/api.service";
import { environment as url } from '../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list-flight',
  templateUrl: './ticket-list-flight.component.html',
  styleUrls: ['./ticket-list-flight.component.scss']
})

export class TicketListFlightComponent implements OnInit {
  //vuelos: [];
  closeResult: string;
  constructor(private modalService: NgbModal,
    private api: ApiService) {

  }

  openDetail(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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



  ngOnInit() {
    this.api.getUrl(url.endpoint.default._get.getflights).then(Response => {
      console.log("Respuesta:: " + JSON.stringify(Response));
      // this.vuelos = Response;
    }).catch(error => {
      console.log("eroorr :: ", error);
    });
  }



}

