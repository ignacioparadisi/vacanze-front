import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FlightReservationsComponent } from '../flight-reservations/flight-reservations.component';
import { environment as url } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.scss']
})

export class ListReservationsComponent implements OnInit {
  @Input() num: number;
  @Input() longi: [];
  @Input() longiGo: [];
  @Input() dateS: Date;
  @Input() dateE: Date;
  @Input() priceL: number;
  @Input() normal: boolean=false;
  public listRes: string;
 // public listResFlight: Array<object>;
  public numeVal:number;
  public userId:number;
  public numPas:number;
  public id_fli:number;
  public valida:boolean=false;

 public isDataLoaded:boolean=false;
  closeResult: string;
  @Output() public actionAlertEventEmitter = new EventEmitter();
  @Output() public emitRouting = new EventEmitter();
  constructor(private modalService: NgbModal, private api: ApiService,private storage: LocalStorageService) { }
     
  public openModal(id:number){
    console.log("entro en modal");
    //event.preventDefault();
    this.id_fli=id;
    console.log("fliID:",this.id_fli);
    console.log(this.normal);
    console.log(this.valida);
    console.log("numero de pasajeros:"+this.num);
    if (this.normal==true) {
      this.numPas=1;
      var data={'_numPas':this.numPas,'_id_user':this.userId,'_id_fli': this.id_fli}
    }else{
      var data={'_numPas':this.num,'_id_user':this.userId,'_id_fli': this.id_fli}
    }

    console.log("longi al principio:",this.longi)
    Swal.fire({
        title: 'Estas seguro?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, reservar!'
      }).then((result) => {
        if (result.value) {
          
        console.log("entro en result")
          this.postResFlights(data);
         
            Swal.fire(
              'Reservado exitosamente!!',
            )
          
          console.log(this.longi)
          console.log(this.priceL)
          console.log(this.dateE)
          console.log(this.userId)

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
 
 
 public getLocalStorage(){
 this.storage.getItem('id').subscribe(storeId =>
  {
    if (storeId) {
      console.log("storeId:",storeId)
      this.isDataLoaded=true;
      this.userId= storeId
      console.log("userId:",this.userId)

    }else{
      console.log("storeId vacio");
    }
  })
 
 }
 getVal(){
   console.log("valida en getVAL!"+this.valida)
 }
  ngOnInit() {
   // this.getListFlights();
   this.getLocalStorage();
  }
  
   postResFlights(data){
    console.log('llame al metodo POST');
    console.log("data en metodo post:",data);
    // API URL
    //const requestURL = 'flight-reservation';
    this.api.postUrl(url.endpoint.default._post.postResFlight,data).then(
        response => {
          this.valida=true;
          this.listRes = response;
          console.log("response:"+response);
         
        },
        error => {
          console.log(error);
         }
    );
 this.getVal();
}

}

