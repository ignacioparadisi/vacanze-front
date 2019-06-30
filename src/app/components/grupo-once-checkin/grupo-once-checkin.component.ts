import { Component, OnInit } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  selector: 'app-grupo-once-checkin',
  templateUrl: './grupo-once-checkin.component.html',
  styleUrls: ['./grupo-once-checkin.component.scss']
  
})
export class GrupoOnceCheckinComponent implements OnInit {

  private bagList: Array<any> = [];
  private bagdet: any = {};

  initAddBag()
  {
    this.bagdet.reference="";
    this.bagdet.weigth= "";
    this.bagdet.descrip= "";
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

  constructor() {}
  ngOnInit() 
  {
    this.initAddBag();
  }


}
