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
  @Input() longiGoIn: [];
  @Input() dateS: Date;
  @Input() dateE: Date;
  @Input() priceL: number;
  @Input() normal: boolean=false;
  public listRes: string;
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
  //Metodo que abre el modal
  public openModal(id:number){
    var today = new Date();
    var dateCompPass=today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'
    +"0"+today.getDate()+" "+today.getHours()+":"+("0"+today.getMinutes()).slice(-2)+":"+("0"+today.getSeconds()).slice(-2);
    this.id_fli=id;
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
          if (this.normal==true) {
            this.numPas=1;
            var data={'_numPas':this.numPas,'_timestamp':dateCompPass,'_id_user':this.userId,'_id_fli': this.id_fli}
          }else{
            var data={'_numPas':this.num,'_timestamp':dateCompPass,'_id_user':this.userId,'_id_fli': this.id_fli}
          }
          this.postResFlights(data);
         
            Swal.fire(
              'Reservado exitosamente!!',
            )
            
        }
      })
    }
  public messageAlert(event: Object){
    this.actionAlertEventEmitter.emit(event);
  }
  //metodo que obtiene el id del usuario
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
  ngOnInit() {
   this.getLocalStorage();
  }
  //Metodo que hace la reserva con peticion POST
   postResFlights(data){
    // API URL
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
 }

}

