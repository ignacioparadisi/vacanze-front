import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { COUNTRYS, HOURS, MINUTES } from '../../../../utils/select.util';
import { ApiService } from '../../../../services/api.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-new-grupo-tres',
  templateUrl: './new.grupo-tres.html',
  styleUrls: ['./new.grupo-tres.scss']
})
export class NewGrupoTres implements OnInit {
    closeResult: string;
    time = {hour: 13, minute: 30};
    public countries = [];
    public hours = HOURS;
    public minutes = MINUTES;
    public airplanes = [];
    public form: FormGroup;
    public contactList: FormArray;

    constructor(private modalService: NgbModal, private fb: FormBuilder, private apiService: ApiService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            locDeparture: [null, Validators.compose([Validators.required])],
            locArrival: [null, Validators.compose([Validators.required])],
            plane: [null, Validators.compose([Validators.required])],
            price: [null, Validators.compose([Validators.required])],
            departure: [null, Validators.compose([Validators.required])],
            arrival: [null, Validators.compose([Validators.required])],
            departureDate: [null, Validators.compose([Validators.required])],
            arrivalDate: [null, Validators.compose([Validators.required])],
        });
        this.getAirplanes();
    }

    public getAirplanes() {
        // API URL
        const requestURL = '/api/airplanes';
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

    public getCountries() {
        const requestURL = '';
        this.apiService.getUrl(requestURL).then(
            response => {
                this.countries = response;
            }, error => {
                console.log(error);
            }
        );
    }

    public markAllAsTouched() {
        this.form.get('locDeparture').markAsTouched();
        this.form.get('locArrival').markAsTouched();
        this.form.get('plane').markAsTouched();
        this.form.get('price').markAsTouched();
        this.form.get('departure').markAsTouched();
        this.form.get('arrival').markAsTouched();
        this.form.get('departureDate').markAsTouched();
        this.form.get('arrivalDate').markAsTouched();
    }

    /*Pregunto si la fecha de salida es menor o igual que la de llegada*/
    compare(salida: number, llegada: number) {
        if (salida <= llegada) { return 1; } else { return -1; }
    }

    /*Convierto las fechas a DD/MM/YYYY para luego realizar una comparación*/
    transformarFechas(payload: any){
        payload.salida = moment(new Date(payload.departure), 'DD/MM/YYYY');
        payload.llegada = moment(new Date(payload.arrival), 'DD/MM/YYYY');
        var salida = parseInt(payload.salida.date() + (payload.salida.month() + 1), 10);
        var llegada = parseInt(payload.llegada.date() + (payload.llegada.month() + 1), 10);
        var fechas = this.compare(salida, llegada);
        delete payload.salida;
        delete payload.llegada;
        return fechas;
    }

    submit() {
        console.log(this.form.value);
        this.markAllAsTouched();
        const payload = this.form.value;
        var fechas = this.transformarFechas(payload);

        if (fechas === 1) {
            payload.departure = moment(payload.departure).format('DD-MM-YYYY h:mm:ss');
            payload.arrival = moment(payload.arrival).format('DD-MM-YYYY h:mm:ss');
            payload.plane = { id: payload.plane };
            payload.routes = [
                {
                    locDeparture: payload.locDeparture,
                    locArrival: payload.locArrival,
                    departureDate: payload.departureDate,
                    arrivalDate: payload.arrivalDate
                }
            ];
            delete payload.locDeparture;
            delete payload.locArrival;
            delete payload.departureDate;
            delete payload.arrivalDate;
            if (this.form.valid) {
                this.apiService.postUrl('/api/flights', payload).then(
                    response => {
                        console.log(response);
                    }, error => {
                        console.log(error);
                    }
                );
            }
        } else {
            console.log('La fecha de llegada no puede ser anterior a la de salida.');
        }
    }

    public invalid(controlName: string, form: FormGroup) {
        return form.get(controlName).touched && !form.get(controlName).valid;
    }

    public valid(controlName: string, form: FormGroup) {
        return form.get(controlName).touched && form.get(controlName).valid;
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
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

}
