import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list-grupo-tres',
  templateUrl: './list.grupo-tres.html',
  styleUrls: ['./list.grupo-tres.scss']
})
export class ListGrupoTres implements OnInit {
  closeResult: string;
  time = {hour: 13, minute: 30};
  public flight = [];
  public flights = [];
  public countries = [{"nombre":"alex"}, {"nombre":"jesus"}];
  public flightForm: FormGroup;

  constructor(private modalService: NgbModal, private apiService: ApiService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.flightForm = this.fb.group({
      countrySalida : [null, Validators.required],
      citySalida : [null, Validators.required],
      countryLlegada : [null, Validators.required],
      cityLlegada : [null, Validators.required],
    });
    this.getFlights();
  }

  getFlights() {
    const requestURL = '/api/flights';
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
    const requestURL = `https://jsonplaceholder.typicode.com/users/${id}`;
    this.apiService.getUrl(requestURL).then(
      response => {
      this.flightForm.setValue({
        countrySalida: response.name,
        citySalida: response.username,
        countryLlegada: response.id,
        cityLlegada: response.name
      });
      this.flight = response;
      console.log(this.flightForm.value);
      },
      error => {
      console.log(error);
      }
  );
  }

  onFormSubmit(form: NgForm) {
    /*this.api.updateProduct(this._id, form)
      .subscribe(response => {

        }, (err) => {
          console.log(err);
        }
      );*/
  }

  openLg(content, id: number) {
    this.getFlight(id);
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
          return  `with: ${reason}`;
      }
  }

  deleteFile(id: number) {
    this.router.navigate(['/grupo-tres/listado']);
    console.log('Vuelo con el id='+id+ 'fue eliminado con éxito');
  }

  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
  }

  public valid(controlName: string, form: FormGroup) {
      return form.get(controlName).touched && form.get(controlName).valid;
  }
}
