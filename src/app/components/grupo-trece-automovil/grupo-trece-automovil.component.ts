import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'app-grupo-trece-automovil',
  templateUrl: './grupo-trece-automovil.component.html',
  styleUrls: ['./grupo-trece-automovil.component.scss']
})
export class GrupoTreceAutomovilComponent implements OnInit {
  closeResult: string;
    locations= [];
    automobiles=[];
    public form: FormGroup;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private service:ApiService) { }


  ngOnInit() {
    this.form = this.fb.group({
    CheckIn:[null, Validators.compose([Validators.required])],
    CheckOut:[null, Validators.compose([Validators.required])],
    City:[null, Validators.compose([Validators.required])], 
    Country:[null, Validators.compose([Validators.required])]
    });
    this.initializaDate();
    this.getLocations();
     
   }
 

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

  initializaDate(){
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

  getLocations(){
      const requestURL = "locations/";
      this.service.getUrl(requestURL).then(
    response=>{
    this.locations = response;
    console.log(response);
    },
        error=>{
            console.log(error);
        }
      )
  }

  getAvailableReservations(){
      const requestURL ="automobiles/";
      this.service.getUrl(requestURL).then(
          response=>{
              this.automobiles = response;
              console.log(response);
          },
          error=>{
              console.log(error);
          }
      )
  }

  public markAllAsTouched() {
    this.form.get('CheckIn').markAsTouched();
    this.form.get('CheckOut').markAsTouched();
    this.form.get('Country').markAsTouched();
    this.form.get('City').markAsTouched();
}

public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
}

public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
}

public submit(){
    console.log("Entro en submit()");
    this.markAllAsTouched();
    console.log(this.form.value);
}

  deleteFile(){
      console.log("Registro eliminado")
  }

}
