import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { TypeFlight } from '../../../classes/type_flight';
import Swal from 'sweetalert2';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { PeopleFlight } from '../../../classes/people_flight';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-sale-flight',
  templateUrl: './ticket-sale-flight.component.html',
  styleUrls: ['./ticket-sale-flight.component.scss']
})
export class TicketSaleFlightComponent implements OnInit {
  public form: FormGroup;
  public typeFlights: TypeFlight[]=[];
  public adultFlights:PeopleFlight[]=[];
  public active:boolean=false;
  public cont:number=3;
  public arrayNumber: number[] = [1,2];
  public disabled:boolean=true;
  public disabledOut:boolean=false;
  public disabledPpl:boolean=false;
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
      fechaE:new FormControl(null, [Validators.required]),
      pasaporte:new FormControl(null, [Validators.required])
    })
    var today = new Date();
    var dateComp=today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+today.getDate();
    var getSelectedOut =<HTMLInputElement> document.getElementById("out_id");
    var getSelectedEnt =<HTMLInputElement> document.getElementById("entry_id");
    document.getElementById("out_id").setAttribute("min", dateComp);
    document.getElementById("entry_id").setAttribute("min", dateComp);
    var dateRe= document.getElementById("out_id");
    var dateGo= document.getElementById("entry_id");
    dateRe.addEventListener("change",function () {
      document.getElementById("entry_id").setAttribute("min", getSelectedOut.value.toString());
     });
    dateGo.addEventListener('change',function () {
      document.getElementById("out_id").setAttribute("max", getSelectedEnt.value.toString());
    })
   }
     private typeFlight(): TypeFlight[]{
        this.typeFlights=[
        new TypeFlight(0,'Ida'),
        new TypeFlight(1,'Ida y Vuelta ')
       ];
        return this.typeFlights; 
     }

     pantallaConReserva(){
      var pagina, liSinReserva, liConReserva;
      pagina = document.getElementById('paginaConReserva');
      liSinReserva = document.getElementById('li-sin-reserva');
      liConReserva = document.getElementById('li-con-reserva');
  
      pagina.style.display = "block";
      liSinReserva.style.display = "none";
      liConReserva.style.display = "none";
    }
  
    pantallaSinReserva(){
      var pagina, liSinReserva, liConReserva;
      pagina = document.getElementById('paginaSinReserva');
      liSinReserva = document.getElementById('li-sin-reserva');
      liConReserva = document.getElementById('li-con-reserva');
  
      pagina.style.display = "block";
      liSinReserva.style.display = "none";
      liConReserva.style.display = "none";
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
    if (this.selectedTyp=="0") {
      if (!this.isChecked) {
        input.setAttribute("disabled","true");
      output.removeAttribute("disabled");
      this.disabled=true;
      }
      this.disabled=true;
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
      }
      
    }
  }
 /*    checkboxSelected(event: any){
    var element =<HTMLInputElement> document.getElementById("date_id");
    this.isChecked= element.checked;
    var input= document.getElementById("entry_id");
    var output= document.getElementById("out_id");
    var ppl= document.getElementById("peopleId");
    if (this.isChecked) {
      input.setAttribute("disabled","true");
      output.setAttribute("disabled","true");
      ppl.setAttribute("disabled","true");
      this.disabledOut=true;
      this.disabled=true;
      this.disabledPpl=true;
    }else{
      if (this.disabled==false || this.selectedTyp=="1") {
        input.removeAttribute("disabled");
        this.disabled=false;
      }
      ppl.removeAttribute("disabled");
      output.removeAttribute("disabled");
       this.disabledOut=false;
       this.disabledPpl=false;
    }

  } */
  listadoReserva(){
   // if (this.form.get('pasaporte').valid && this.form.get('nacionalidad').value !=-1 ) {
     this.router.navigate(['grupo-cuatro/ticket-list-flight']);
   /* } else {
     this.subM=true;
   } */
  }

  onSubmit() {
     if (this.form.get('origen').valid && this.form.get('destino').valid
     && (this.form.get('adultFlights').value !=-1 || this.disabledPpl==true) && (this.form.get('fechaE').valid || this.disabled==true)
     && (this.form.get('fechaS').valid || this.disabledOut==true)) {
      this.router.navigate(['grupo-cuatro/ticket-list-flight']);
    } else {
      this.subM=true;
    }
  }
  
  public  postResFlight(){
     this.api.postUrl('','ssssssssssssssss');

  }

}
