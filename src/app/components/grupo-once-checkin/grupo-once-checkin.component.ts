import { Component, OnInit } from '@angular/core';
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
    this.bagdet.weigth= 0;
    this.bagdet.descrip= "";
  }
  
  addFieldValue(bagdet: any) {
      this.bagList.push(bagdet)
      //console.log(bagdet);
      this.bagdet = {};
      this.initAddBag();
  }

  deleteFieldValue(index) {
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
