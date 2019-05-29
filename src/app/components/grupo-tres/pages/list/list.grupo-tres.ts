import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { compararFechas } from '../../../../utils/global_functions';
import * as moment from 'moment';
import { CustomValidatorDirective } from '../../../../directives/validations/custom-validations.directive';


@Component({
  selector: 'app-list-grupo-tres',
  templateUrl: './list.grupo-tres.html',
  styleUrls: ['./list.grupo-tres.scss']
})
export class ListGrupoTres implements OnInit {
  closeResult: string;
  time = { hour: 13, minute: 30 };
  public flight = [];
  public flights = [];
  public airplanes = [];
  public countries = [];
  public flightForm: FormGroup;
  public compararFechas;
  public id = 0;

  constructor(private modalService: NgbModal, private apiService: ApiService, private fb: FormBuilder, private router: Router) {
    this.compararFechas = compararFechas;
  }

  ngOnInit() {
    this.flightForm = this.fb.group({
      plane: [null, Validators.required],
      price: [null, Validators.required],
      departure: [null, Validators.required],
      arrival: [null, Validators.required],
      loc_departure: [null, Validators.required],
      loc_arrival: [null, Validators.required],
      id: [null],
    });
    this.getFlights();
  }


  getLocations() {
    const requestURL = 'locations';
    this.apiService.getUrl(requestURL).then(
      response => {
        this.countries = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAirplanes() {
    // API URL
    const requestURL = 'airplanes';
    this.apiService.getUrl(requestURL).then(
      response => {
        this.airplanes = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getFlights() {
    const requestURL = 'flights';
    this.apiService.getUrl(requestURL).then(
      response => {
        this.flights = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getFlight(id: number) {
    console.log(id);
    const requestURL = `flights/${id}`;
    this.apiService.getUrl(requestURL).then(
      response => {
        this.flightForm.setValue({
          plane: response.plane.id,
          price: response.price,
          departure: response.departure,
          arrival: response.arrival,
          loc_departure: response.loc_departure,
          loc_arrival: response.loc_arrival,
          id: response.id
        });
        this.flight = response;
        this.id = response.id;
        console.log(this.flightForm.value);
      },
      error => {
        console.log(error);
      }
    );
  }

  onFormSubmit() {
    const payload = this.flightForm.value;
    let fechas = this.compararFechas(new Date(payload.departure), new Date(payload.arrival));

    if (fechas === 1) {
      payload.departure = moment(payload.departure).format('MM-DD-YYYY HH:mm:ss');
      payload.arrival = moment(payload.arrival).format('MM-DD-YYYY HH:mm:ss');
      payload.plane = { id: parseInt(payload.plane, 10) };
      payload.price = parseInt(payload.price, 10);
      payload.loc_departure = parseInt(payload.locDeparture, 10);
      payload.loc_arrival = parseInt(payload.locArrival, 10);

      delete payload.locArrival;
      delete payload.locDeparture;

      if (this.flightForm.valid) {
        this.apiService.putUrl('flights', payload).then(
          response => {
            console.log(response);
          }, (err) => {
            console.log(err);
          }
        );
      }
    }
  }

    open(content) {
      this.getFlight(this.id);
      this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  deleteFile(id: number) {
    const requestURL = `flights/${id}`;
    this.apiService.deleteUrl(requestURL).then(
      response => {
        console.log(response);
        this.router.navigate(['/grupo-tres/listado']);
        console.log('Vuelo con el id=' + id + 'fue eliminado con éxito');
      }, error => {
        console.error(error);
      }
    );
  }

  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
  }

  public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
  }
}
