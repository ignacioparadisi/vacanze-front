import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { Class_flight } from 'src/app/classes/class_flight';
import { Type_flight } from 'src/app/classes/type_flight';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { People_flight } from 'src/app/classes/people_flight';
@Component({
  selector: 'app-flight-reservations',
  templateUrl: './flight-reservations.component.html',
  styleUrls: ['./flight-reservations.component.scss']
})
export class FlightReservationsComponent implements OnInit {

  public form: FormGroup;
  public class_flight: Class_flight[] = [];
  public type_flight: Type_flight[]=[];
  public adult_flight:People_flight[]=[];


  constructor(private api: ApiService) { }
   private selectedTyp: string="";
   
  ngOnInit() {
      this.fetchFlight();
      this.typeFlight();
      this.adultFlight();
     
      this.form=new FormGroup({
        class_flight: new FormControl(-1, [Validators.required]),
        name: new FormControl(null, [Validators.required]),
        origen: new FormControl(null, [Validators.required]),
        destino: new FormControl(null, [Validators.required]),
        FechaS:new FormControl(null, [Validators.required]),
        fechaE:new FormControl(null, [Validators.required])
      })
    

  }

  private fetchFlight(): Class_flight[] {
    this.class_flight = [
      new Class_flight(0, 'Economy'),
      new Class_flight(1, 'Premium Economy'),
      new Class_flight(2, 'Ejecutiva'),
      new Class_flight(3, 'Primera Clase'),
    ];
    return this.class_flight;
  }

  private typeFlight(): Type_flight[]{
    this.type_flight=[
      new Type_flight(0,'Ida'),
      new Type_flight(1,'Ida y Vuelta '),
      new Type_flight(2,'Multidestinos'), 
    ];
    return this.type_flight; 
  }

 
  private adultFlight():People_flight[]{

   
      this.adult_flight=[
        new People_flight(1,'a'),
        new People_flight(2,'a'),
        new People_flight(3,'a'),
        new People_flight(4,'a'),
        new People_flight(5,'a'),
        new People_flight(6,'a'),
        new People_flight(7,'a'),
        new People_flight(8,'a'),
        new People_flight(9,'a'),
        new People_flight(10,'a'),
      ];
   
    return this.adult_flight;
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
