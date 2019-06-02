import { ApiService } from '../../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { TypeFlight } from '../../../classes/type_flight';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { PeopleFlight } from '../../../classes/people_flight';
import { Router } from '@angular/router';
import { environment as url } from '../../../../environments/environment';
import { ListReservationsComponent } from '../list-reservations/list-reservations.component';

@Component({
  selector: 'app-flight-reservations',
  templateUrl: './flight-reservations.component.html',
  styleUrls: ['./flight-reservations.component.scss'],
  
})
export class FlightReservationsComponent implements OnInit {
 
  public form: FormGroup;
  public typeFlights: TypeFlight[]=[];
  public adultFlights:PeopleFlight[]=[];
  public active:boolean=false;
  public cont:number=3;
  public arrayNumber: number[];
  public disabled:boolean=true;
  public disabledOut:boolean=false;
  public disabledPpl:boolean=false;
  public isChecked;
  public numero:number=34;
  public subM:boolean=false;
  public listRes = [];
  public listFlight = [];
  //public listFlight: Array<Object>;
  public listFlightRes: Array<Object>;
  public dateOut:Date;
  public dateIn:Date;
  public price:number;

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
    //validacion de fechas
    var today = new Date();
    console.log(today);
    var day=today.getDate();
    if (day<10) {
      var dateComp=today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+"0"+today.getDate();
    }else{
      var dateComp=today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+today.getDate();
    }
    var getSelectedOut =<HTMLInputElement> document.getElementById("out_id");
    var getSelectedEnt =<HTMLInputElement> document.getElementById("entry_id");
    console.log(dateComp);
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
   //fin de validacion de fechas
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
  //validaciones para el radio button
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
  //validaciones del checkbox
    checkboxSelected(event: any){
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

  }
  json = {
    "_seatNum": 2,
    "_timestamp": '2019-05-31 13:00:00.59',
    "_numPas": 1,
    "_id_user": 1,
    "_id_pay": 1,
    "_id_fli": 1
  }
  
  public postListFlights() {
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
    );
}
//metodo que devuelve el id del origen y destino
 getIdCity() {
  console.log('llame al metodo getidlist');
  // API URL
  //const requestURL = 'flight-reservation';
  this.api.getUrl(url.endpoint.default._get.getIdCity+'/'
  +this.form.get('origen').value+'/'+this.form.get('destino').value).then(
      response => {
          this.arrayNumber = response;
          this.getListFlight(this.arrayNumber[0],this.arrayNumber[1]);
          console.log(response);
          console.log("arrayNumber:",this.arrayNumber.length);

      },
      error => {
          console.log(error);
      }
  );
}
//metodo que devuelve los vuelos
getListFlight(i: number,j: number) {
  console.log('llame al metodo listFlight');
  // API URL
  //const requestURL = 'flight-reservation';
  this.api.getUrl(url.endpoint.default._get.getListFlight+'/'
  +i+'/'+j).then(
      response => {
          this.listFlightRes = response;
          console.log(response);
        
          console.log("listFlightRes tiene:",this.listFlightRes);
          console.log("listFlightRes arrival:",this.listFlightRes.length);

      },
      error => {
          console.log(error);
      }
  );
}

  onSubmit() {
    this.subM=true;

     if (this.form.get('origen').valid && this.form.get('destino').valid
     && (this.disabledPpl==true) && (this.disabled==true)
     && (this.disabledOut==true)) {
      this.getIdCity();
      this.numero=66;
      console.log("entro en el normal")
      // this.router.navigate(['flight-reservations/list-reservations']);
    } else if  (this.form.get('origen').valid && this.form.get('destino').valid && this.form.get('fechaS').valid && this.disabled==true && this.form.get('adultFlights').value!=-1) {
      console.log("metodo de busqueda por ida")
    } else if (this.form.get('origen').valid && this.form.get('destino').valid && (this.disabledOut==false)&&(this.disabled==false)&&this.form.get('fechaE').valid) {
      console.log("otra metodo de busqueda por ida y vuelta")
     
    }
  }
  


}
