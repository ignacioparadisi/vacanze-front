import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grupo-trece-automovil',
  templateUrl: './grupo-trece-automovil.component.html',
  styleUrls: ['./grupo-trece-automovil.component.scss']
})
export class GrupoTreceAutomovilComponent implements OnInit {

  closeResult: string;
  constructor(private modalService: NgbModal) { }

  openLg(content) {
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

  ngOnInit() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var de = '' +dd
    var me = '' +mm
     if(dd<10){
            de='0'+dd
        } 
        if(mm<10){
           var me='0'+mm
        } 
    
   var todaye = yyyy+'-'+me+'-'+de;
    document.getElementById("datefieldAlq").setAttribute("min", todaye);
    document.getElementById("datefieldDev").setAttribute("min", todaye);
  }

  deleteFile(){
      console.log("Registro eliminado")
  }

}
