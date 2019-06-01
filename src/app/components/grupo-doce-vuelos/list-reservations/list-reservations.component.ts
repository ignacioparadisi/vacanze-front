import { Component, OnInit,Input } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FlightReservationsComponent } from '../flight-reservations/flight-reservations.component';
import { environment as url } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.scss']
})
export class ListReservationsComponent implements OnInit {
  @Input() num: number;
  public listResFlight: Array<object>;
  public nume:number;
  closeResult: string;
  constructor(private modalService: NgbModal, private api: ApiService) { }
  
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
          return  `with: ${reason}`;
      }
  }
  
   getListFlights() {
    console.log('llame al metodo');
    // API URL
    //const requestURL = 'flight-reservation';
    this.api.getUrl(url.endpoint.default._get.getResFlight).then(
        response => {
            this.listResFlight = response;
            console.log(response);
            console.log("listResFlight:",this.listResFlight.length);
  
        },
        error => {
            console.log(error);
        }
    );
  }

  ngOnInit() {
    this.getListFlights();
    console.log("num tiene:",this.nume);
  }



}
