import { ApiService } from '../../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { TypeFlight } from '../../../classes/type_flight';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeopleFlight } from '../../../classes/people_flight';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment as url } from '../../../../environments/environment';

@Component({
  selector: 'app-flight-reservations',
  templateUrl: './flight-reservations.component.html',
  styleUrls: ['./flight-reservations.component.scss'],
  
})
export class FlightReservationsComponent implements OnInit {

  public form: FormGroup;
  public typeFlights: TypeFlight[]=[];
  public adultFlights:PeopleFlight[]=[];
  public countries = [];
  public active:boolean=false;
  public arrayNumber: number[];
  public disabled:boolean=true;
  public normalIn:boolean=false;
  public GoIn:boolean=false;
  public BackIn:boolean=false;
  public disabledOut:boolean=false;
  public disabledPpl:boolean=false;
  public isChecked;
  public subM:boolean=false;
  public listFlight = [];
  public listFlightRes: Array<Object>;
  public listFlightResGo: Array<Object>;
  public listFlightResGoIn: Array<Object>;
  public dateOut:Date;
  public dateIn:Date;
  public dateCompPass:string;
  public closeResult: string;

    constructor(private api: ApiService, private router: Router, private modalService: NgbModal) { }
        
   private selectedTyp: string="";
   
  ngOnInit() {
    this.typeFlight();
    this.adultFlight();
    //this.getCountries();
    this.form = new FormGroup({
      adultFlights: new FormControl(-1, Validators.required),
      origen: new FormControl(null, [Validators.required]),
      destino: new FormControl(null, [Validators.required]),
      fechaS: new FormControl(null, [Validators.required]),
      fechaE: new FormControl(null, [Validators.required])
    })
    //////////////validacion de fechas////////////////////////////////////
    var today = new Date();
    var day=today.getDate();
    if (day<10) {
      var dateComp=today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+"0"+today.getDate();
    }else{
      var dateComp=today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+today.getDate();
    }
    +"0"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    var getSelectedOut =<HTMLInputElement> document.getElementById("out_id");
    var getSelectedEnt =<HTMLInputElement> document.getElementById("entry_id");
    console.log(dateComp);
    document.getElementById("out_id").setAttribute("min", dateComp);
    document.getElementById("entry_id").setAttribute("min", dateComp);
    var dateRe = document.getElementById("out_id");
    var dateGo = document.getElementById("entry_id");
    dateRe.addEventListener("change", function () {
      document.getElementById("entry_id").setAttribute("min", getSelectedOut.value.toString());
    });
    dateGo.addEventListener('change', function () {
      document.getElementById("out_id").setAttribute("max", getSelectedEnt.value.toString());
    })
  }

  public open(content) {
    this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public getCountries() {
    const requestURL = 'locations/countries';
    this.api.getUrl(requestURL).then(
        response => {
          console.log(response);
            this.countries = response;
        }, error => {
          console.log(error);
        }
    );
  }

  private typeFlight(): TypeFlight[] {
    this.typeFlights = [
      new TypeFlight(0, 'Sólo Ida'),
      new TypeFlight(1, 'Ida y Vuelta ')
    ];
    return this.typeFlights;
  }
  
  private adultFlight(): PeopleFlight[] {
    this.adultFlights = [
      new PeopleFlight(1, 'a'),
      new PeopleFlight(2, 'a'),
      new PeopleFlight(3, 'a'),
      new PeopleFlight(4, 'a'),
      new PeopleFlight(5, 'a'),
      new PeopleFlight(6, 'a'),
      new PeopleFlight(7, 'a'),
      new PeopleFlight(8, 'a'),
      new PeopleFlight(9, 'a'),
      new PeopleFlight(10, 'a'),
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
        input.setAttribute("disabled", "true");
        output.removeAttribute("disabled");
        this.disabled = true;
      }
      this.disabled = true;
    } else {
      if (this.selectedTyp == "2") {
        this.arrayNumber;
        this.disabled = false;
      } else {
        if (!this.isChecked && this.disabled == true) {
          input.removeAttribute("disabled");
          output.removeAttribute("disabled");
          this.disabled = false;
        }
      }

    }
  }
  ////////validaciones del checkbox///////////////
  checkboxSelected(event: any){
    var element =<HTMLInputElement> document.getElementById("date_id");
    this.isChecked= element.checked;
    var input= document.getElementById("entry_id");
    var output= document.getElementById("out_id");
    var ppl= document.getElementById("peopleId");
    if (this.isChecked) {
      input.setAttribute("disabled", "true");
      output.setAttribute("disabled", "true");
      ppl.setAttribute("disabled", "true");
      this.disabledOut = true;
      this.disabled = true;
      this.disabledPpl = true;
    } else {
      if (this.disabled == false || this.selectedTyp == "1") {
        input.removeAttribute("disabled");
        this.disabled = false;
      }
      ppl.removeAttribute("disabled");
      output.removeAttribute("disabled");
      this.disabledOut = false;
      this.disabledPpl = false;
    }
  }
//metodo que devuelve el id del origen y destino
 getIdCity() {
  // API URL
  if (this.normalIn==true) {
    this.api.getUrl(url.endpoint.default._get.getIdCity+'/'
    +this.form.get('origen').value+'/'+this.form.get('destino').value).then(
        response => {
            this.arrayNumber = response;
            this.getListFlight(this.arrayNumber[0],this.arrayNumber[1]);
            console.log(response);
  
        },
        error => {
            console.log(error);
        }
    );
  }else if (this.GoIn==true) {
    this.api.getUrl(url.endpoint.default._get.getIdCity+'/'
    +this.form.get('origen').value+'/'+this.form.get('destino').value).then(
        response => {
            this.arrayNumber = response;
            this.getListFlightByDateOut(this.arrayNumber[0],this.arrayNumber[1]);
            console.log(response);
           },
        error => {
            console.log(error);
        }
    );
  }else if (this.BackIn==true) {
    this.api.getUrl(url.endpoint.default._get.getIdCity+'/'
    +this.form.get('origen').value+'/'+this.form.get('destino').value).then(
        response => {
            this.arrayNumber = response;
            this.getListFlightByDateOutIn(this.arrayNumber[0],this.arrayNumber[1]);
            console.log(response);
          },
        error => {
            console.log(error);
        }
    );
  }
}
//metodo que devuelve los vuelos sin fecha
getListFlight(i: number,j: number) {
  // API URL
  this.api.getUrl(url.endpoint.default._get.getListFlight+'/'
  +i+'/'+j).then(
      response => {
          this.listFlightRes = response;
          console.log(response);
        },
      error => {
         console.log(error);
        }
  );
}
///metodo que devuelve los vuelos de ida
getListFlightByDateOut(i: number,j: number) {
    // API URL
    this.api.getUrl(url.endpoint.default._get.getListFlightGo+'/'
    +i+'/'+j+'/'+this.form.get('fechaS').value+'/'+this.form.get('adultFlights').value).then(
        response => {
            this.listFlightResGo = response;
    },
        error => {
            console.log(error);
        }
    );
}
//metodo que devuelve los vuelos de ida y vuelta
getListFlightByDateOutIn(i: number,j: number) {
  // API URL
  this.api.getUrl(url.endpoint.default._get.getListFlightGo+'/'
  +i+'/'+j+'/'+this.form.get('fechaS').value+'/'+this.form.get('fechaE').value+'/'+this.form.get('adultFlights').value).then(
      response => {
        console.log(response);
        this.listFlightResGoIn = response;
  },
      error => {
          console.log(error);
      }
  );
}

public invalid(controlName: string, form: FormGroup) {
  return form.get(controlName).touched && !form.get(controlName).valid;
}

public valid(controlName: string, form: FormGroup) {
  return form.get(controlName).touched && form.get(controlName).valid;
}

//Metodo que se activa cuando el usuario hace click en buscar.
  onSubmit() {
    this.subM=true;
    if (this.form.get('origen').valid && this.form.get('destino').valid
     && (this.disabledPpl==true) && (this.disabled==true)
     && (this.disabledOut==true)) {
      this.normalIn=true;
      this.GoIn=false;
      this.BackIn=false;
      this.listFlightResGo=null;
      this.listFlightResGoIn=null;
      this.getIdCity();
    } else if  (this.form.get('origen').valid && this.form.get('destino').valid && this.form.get('fechaS').valid && this.disabled==true && this.form.get('adultFlights').value!=-1) {
      this.normalIn=false;
      this.BackIn=false;
      this.listFlightRes=null;
      this.listFlightResGoIn=null;
      this.GoIn=true;
      this.getIdCity();
    } else if (this.form.get('origen').valid && this.form.get('destino').valid && (this.disabledOut==false)&&(this.disabled==false)&&this.form.get('fechaE').valid && this.form.get('adultFlights').value!=-1) {
      this.normalIn=false;
      this.GoIn=false;
      this.BackIn=true;
      this.listFlightResGo=null;
      this.listFlightRes=null;
      this.getIdCity();
    }
  }
  
}
