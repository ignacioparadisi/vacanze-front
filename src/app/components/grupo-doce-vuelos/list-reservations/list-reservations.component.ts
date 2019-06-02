import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FlightReservationsComponent } from '../flight-reservations/flight-reservations.component';
import { environment as url } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.scss']
})
export class ListReservationsComponent implements OnInit {
  @Input() num: number;
  @Input() longi: [];
  @Input() dateS: Date;
  @Input() dateE: Date;
  @Input() price: number;
  public listRes: [];
 // public listResFlight: Array<object>;
  public nume:number;
  closeResult: string;
  @Output() public actionAlertEventEmitter = new EventEmitter();
  @Output() public emitRouting = new EventEmitter();
  constructor(private modalService: NgbModal, private api: ApiService) { }
  
  public openModal(event, data: Object, type: string, approved? : boolean){
    //event.preventDefault();
    
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podras revertirlo!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, reservar!'
      }).then((result) => {
        if (result.value) {
          this.longi=null;
          if (this.longi!=null) {
            
         
          Swal.fire(
            
            'Reservado exitosamente!!',
            
            
          )
        }else{
          Swal.fire(
            
            'No se pudo reservar',
            
            
          )
        }
          console.log("reservado")
    
          console.log(this.longi)
          console.log(this.price)
          console.log(this.dateE)

        }
      })
    }
  public messageAlert(event: Object){
    this.actionAlertEventEmitter.emit(event);
  }

   /* private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }*/
  
  /* getListFlights() {
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
  }*/

  ngOnInit() {
   // this.getListFlights();
    console.log("num tiene:",this.nume);
    console.log("dateE tiene:",this.dateE);

  }
  /*public postListFlights() {
    console.log('llame al metodo');
    // API URL
    //const requestURL = 'flight-reservation';
    this.api.postUrl(url.endpoint.default._post.postResFlight,this.json).then(
        response => {
            this.listRes = response;
            console.log(response);
        },
        error => {
            console.log(error);
        }
    );*/
}



