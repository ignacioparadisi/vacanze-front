import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HOURS, MINUTES } from '../../../../utils/select.util';
import { ApiService } from '../../../../services/api.service';
import * as moment from 'moment';
import { CustomValidatorDirective } from '../../../../directives/validations/custom-validations.directive';
import { compararFechas } from '../../../../utils/global_functions';
@Component({
    selector: 'app-new-grupo-tres',
    templateUrl: './new.grupo-tres.html',
    styleUrls: ['./new.grupo-tres.scss'],
    providers: [ ApiService ]
})
export class NewGrupoTres implements OnInit {
    closeResult: string;
    time = { hour: 13, minute: 30 };
    public countries = [];
    public hours = HOURS;
    public minutes = MINUTES;
    public airplanes = [];
    public form: FormGroup;
    public contactList: FormArray;
    public compararFechas;

    constructor(private modalService: NgbModal, private fb: FormBuilder, private apiService: ApiService) {
        this.compararFechas = compararFechas;
    }

    ngOnInit() {
        this.form = this.fb.group({
            locDeparture: [null, Validators.compose([Validators.required])],
            locArrival: [null, Validators.compose([Validators.required])],
            plane: [null, Validators.compose([Validators.required])],
            price: [null, Validators.compose([Validators.required, CustomValidatorDirective.RegularNumbersPositive])],
            departure: [null, Validators.compose([Validators.required])],
            arrival: [null, Validators.compose([Validators.required])]
        });
        this.getAirplanes();
        //this.getCountries();
    }

    public getAirplanes() {
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

    public getCountries() {
        const requestURL = 'locations';
        this.apiService.getUrl(requestURL).then(
            response => {
                this.countries = response;
                console.log(response);
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
    }


    submit() {
        this.markAllAsTouched();
        const payload = this.form.value;
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

            if (this.form.valid) {
                this.apiService.postUrl('flights', payload).then(
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
            return `with: ${reason}`;
        }
    }

}
