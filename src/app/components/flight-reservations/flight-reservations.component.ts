import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { ClassFlight } from 'src/app/classes/class_flight';
import { TypeFlight } from 'src/app/classes/type_flight';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { PeopleFlight } from 'src/app/classes/people_flight';
@Component({
  selector: 'app-flight-reservations',
  templateUrl: './flight-reservations.component.html',
  styleUrls: ['./flight-reservations.component.scss']
})
export class FlightReservationsComponent implements OnInit {

  public form: FormGroup;
  public classFlight: ClassFlight[] = [];
  public typeFlights: TypeFlight[]=[];
  public adultFlights:PeopleFlight[]=[];


  constructor(private api: ApiService) { }
   private selectedTyp: string="";
   
  ngOnInit() {
      this.fetchFlight();
      this.typeFlight();
      this.adultFlight();
     
      this.form=new FormGroup({
        ClassFlight: new FormControl(-1, [Validators.required]),
        name: new FormControl(null, [Validators.required]),
        origen: new FormControl(null, [Validators.required]),
        destino: new FormControl(null, [Validators.required]),
        FechaS:new FormControl(null, [Validators.required]),
        fechaE:new FormControl(null, [Validators.required])
      })
    

  }

  private fetchFlight(): ClassFlight[] {
    this.classFlight = [
      new ClassFlight(0, 'Economy'),
      new ClassFlight(1, 'Premium Economy'),
      new ClassFlight(2, 'Ejecutiva'),
      new ClassFlight(3, 'Primera Clase'),
    ];
    return this.classFlight;
  }

  private typeFlight(): TypeFlight[]{
    this.typeFlights=[
      new TypeFlight(0,'Ida'),
      new TypeFlight(1,'Ida y Vuelta '),
      new TypeFlight(2,'Multidestinos'), 
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
    var element =<HTMLInputElement> document.getElementById("date_id");
    element.checked = null;
    if (this.selectedTyp=="0") {
      input.setAttribute("disabled","true");
      output.removeAttribute("disabled");
    }else{
      input.removeAttribute("disabled");
      output.removeAttribute("disabled");

      console.log(2);
    }
  }
  checkboxSelected(event: any){
    var element =<HTMLInputElement> document.getElementById("date_id");
    var isChecked= element.checked;
    var input= document.getElementById("entry_id");
    var output= document.getElementById("out_id");
    if (isChecked) {
      console.log(1);
      input.setAttribute("disabled","true");
      output.setAttribute("disabled","true");

    }else{
      input.removeAttribute("disabled");
      output.removeAttribute("disabled");
      console.log(2);
    }

  }

}
