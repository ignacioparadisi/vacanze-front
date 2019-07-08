import { Component, OnInit } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment as url } from '../../../environments/environment';
@Component({
  selector: 'app-grupo-once-checkin',
  templateUrl: './grupo-once-checkin.component.html',
  styleUrls: ['./grupo-once-checkin.component.scss']
  
})
export class GrupoOnceCheckinComponent implements OnInit {

  private bagList: Array<any> = [];
  private PostBagList: Array<any> = [];
  private bagdet: any = {};
  public ticket: any;
  constructor( private serv: ApiService) {}
  initAddBag()
  {
    this.bagdet.reference="";
    this.bagdet.weigth= "";
    this.bagdet.descrip= "";
    this.bagdet.fli= "";
    this.bagdet.cru= 0;
  }
  private messageError(message: string) {
    let config: SweetAlertOptions = {
      title: message,
      type: 'error',
      showConfirmButton: false,
      timer: 2000
    }
    Swal.fire(config).then(result => {
    });
  }
  
  addFieldValue(bagdet: any) {
    if((bagdet.reference=="")||(bagdet.weigth=="")||(bagdet.descrip==""))
    {
      this.messageError("Debe completar los campos")
    }
    else
    {
      this.bagList.push(bagdet)
      //console.log(bagdet);
      this.bagdet = {};
      this.initAddBag();
    }
     
  }

  deleteFieldValue(index) {
      this.bagList.splice(index, 1);
  }

  editFieldValue(index) 
  {
    this.bagdet.reference= this.bagList[index].reference;
    this.bagdet.weigth= this.bagList[index].weigth;
    this.bagdet.descrip= this.bagList[index].descrip;
    this.bagList.splice(index, 1);
  }
  private getValuereference(event) {this.bagdet.reference= event.target.value;}
  private getValueweigth(event) {this.bagdet.weigth= event.target.value;}
  private getValuedescrip(event) {this.bagdet.descrip= event.target.value;}
  private getTicketId(event) {this.bagdet.fli= event.target.value;}

  public Registrar()
  {
    if(this.bagdet.fli="")
    {
      this.messageError("Debe completar los campos")
    }
    else
    {
      this.serv.postUrl(url.endpoint.default._post.Baggage, this.bagList)
      .then(response => {
        this.alertSucces(response);
      })
      .catch((err: HttpErrorResponse) => {
        this.alertErrror(err.error)
      })
    }
  }

  private alertSucces(message: string) {
    let config: SweetAlertOptions = {
      title: message,
      type: 'success',
      showConfirmButton: true,
      timer: 5000
    }
    Swal.fire(config).then(result => {
    });
  }

  private alertErrror(error: string) {
    let config: SweetAlertOptions = {
      title: error,
      type: 'error',
      showConfirmButton: false,
      timer: 3000
    }
    Swal.fire(config).then(result => {
    });
  }


  ngOnInit() 
  {
    this.initAddBag();
  }


}
