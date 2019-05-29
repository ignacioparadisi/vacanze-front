import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { TypeFlight } from 'src/app/classes/type_flight';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { PeopleFlight } from 'src/app/classes/people_flight';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-reservations',
  templateUrl: './flight-reservations.component.html',
  styleUrls: ['./flight-reservations.component.scss']
})
export class FlightReservationsComponent implements OnInit {
 
  public form: FormGroup;
  public typeFlights: TypeFlight[]=[];
  public adultFlights:PeopleFlight[]=[];
  public active:boolean=false;
  public cont:number=3;
  public arrayNumber: number[] = [1,2];
  public disabled:boolean=true;
  public disabledOut:boolean=false;
  public isChecked;
  public subM:boolean=false;
    constructor(private api: ApiService, private router: Router) { }
        
   private selectedTyp: string="";
   
  ngOnInit() {
      this.typeFlight();
      this.adultFlight();
      this.form=new FormGroup({
        adultFlights: new FormControl(-1,Validators.required),
        origen: new FormControl(null, [Validators.required]),
        destino: new FormControl(null, [Validators.required]),
        fechaS:new FormControl(null, [Validators.required]),
        fechaE:new FormControl(null, [Validators.required])
      })
     }
     private typeFlight(): TypeFlight[]{
        this.typeFlights=[
        new TypeFlight(0,'Ida'),
        new TypeFlight(1,'Ida y Vuelta ')
       ];
        return this.typeFlights; 
     }

 
  private adultFlight():PeopleFlight[]{
      this.adultFlights=[
        new PeopleFlight(1,'a'),
        new PeopleFlight(2,'a'),
        new PeopleFlight(3,'a'),
        new PeopleFlight(4,'a'),
        new PeopleFlight(5,'a'),
        new PeopleFlight(6,'a'),
        new PeopleFlight(7,'a'),
        new PeopleFlight(8,'a'),
        new PeopleFlight(9,'a'),
        new PeopleFlight(10,'a'),
      ];
   
    return this.adultFlights;
  }
  radioChangeHandler(event: any){
    this.selectedTyp = event.target.id ;
    var input= document.getElementById("entry_id");
    var output= document.getElementById("out_id");
    //var element =<HTMLInputElement> document.getElementById("date_id");
    
    if (this.selectedTyp=="0") {
      if (!this.isChecked) {
        input.setAttribute("disabled","true");
      output.removeAttribute("disabled");
      this.disabled=true;
      }
      this.disabled=true;
      console.log("Estoy en 0");
      }else{
      if(this.selectedTyp=="2"){
        this.arrayNumber;
        this.disabled=false;
       }else{
           if (!this.isChecked && this.disabled==true) {
           input.removeAttribute("disabled");
           output.removeAttribute("disabled");
           this.disabled=false;
          }
       console.log("Estoy en 1");
      }
      
    }
  }
    checkboxSelected(event: any){
    var element =<HTMLInputElement> document.getElementById("date_id");

     this.isChecked= element.checked;
    var input= document.getElementById("entry_id");
    var output= document.getElementById("out_id");
    if (this.isChecked) {
      console.log(1);
      input.setAttribute("disabled","true");
      output.setAttribute("disabled","true");
      this.disabledOut=true;
      this.disabled=true;
    }else{
      if (this.disabled==false || this.selectedTyp=="1") {
        input.removeAttribute("disabled");
        this.disabled=false;
      }
        
        output.removeAttribute("disabled");
       
        this.disabledOut=false;
        console.log(2);
    }

  }
  onSubmit() {
     if (this.form.get('origen').valid && this.form.get('destino').valid
     && (this.form.get('adultFlights').value !=-1) && (this.form.get('fechaE').valid || this.disabled==true)
     && (this.form.get('fechaS').valid || this.disabledOut==true)) {
      console.log('form submitted');

      this.router.navigate(['flight-reservations/list-reservations']);
    } else {
      this.subM=true;
      console.log(this.form.get('adultFlights').value);
      console.log('Llenar los campos');    }
  }
  
  public  postResFlight(){
     this.api.postUrl('','ssssssssssssssss');

  }

}
