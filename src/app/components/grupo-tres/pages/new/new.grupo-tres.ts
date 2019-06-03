import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HOURS, MINUTES } from '../../../../utils/select.util';
import { ApiService } from '../../../../services/api.service';
import * as moment from 'moment';
import { CustomValidatorDirective } from '../../../../directives/validations/custom-validations.directive';
import { compararFechas } from '../../../../utils/global_functions';
import { compararCiudades } from '../../../../utils/global_functions';

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
    public citiesDeparture = [];
    public citiesArrival = [];
    public hours = HOURS;
    public minutes = MINUTES;
    public airplanes = [];
    public form: FormGroup;
    public contactList: FormArray;
    public compararFechas;
    public compararCiudades;
    public errores : boolean = false;
    public messageSuccess : boolean = false;
    public messageDanger : boolean = false;
    public visible : boolean = false;
    public mensaje: [];

    constructor(private modalService: NgbModal, private fb: FormBuilder, private apiService: ApiService) {
        this.compararFechas = compararFechas;
        this.compararCiudades = compararCiudades;
    }

    ngOnInit() {
        this.form = this.fb.group({
            countryDeparture: [null, Validators.compose([Validators.required])],
            locDeparture: [null, Validators.compose([Validators.required])],
            countryArrival: [null, Validators.compose([Validators.required])],
            locArrival: [null, Validators.compose([Validators.required])],
            plane: [null, Validators.compose([Validators.required])],
            price: [null, Validators.compose([Validators.required, CustomValidatorDirective.RegularNumbersPositive])],
            departure: [null, Validators.compose([Validators.required])],
            arrival: [null, Validators.compose([Validators.required])]
        });
        this.getAirplanes();
        this.getCountries();
                        
    }
    
    public getAirplanes() {
        // API URL
        const requestURL = 'airplanes';
        this.apiService.getUrl(requestURL).then(
            response => {
                this.airplanes = response;
            },
            error => {
            }
        );
    }

    public getCountries() {
        const requestURL = 'locations/countries';
        this.apiService.getUrl(requestURL).then(
            response => {
                this.countries = response;
            }, error => {
            }
        );
    }

    public getCitiesDeparture() {
        const requestURL = 'locations/countries/' + this.form.value.countryDeparture + '/cities';
        this.apiService.getUrl(requestURL).then(
            response => {
                this.citiesDeparture = response;
            }, error => {
            }
        );
    }

    public getCitiesArrival() {
        const requestURL = 'locations/countries/' + this.form.value.countryArrival + '/cities';
        this.apiService.getUrl(requestURL).then(
            response => {
                this.citiesArrival = response;
            }, error => {
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
        this.form.get('countryArrival').markAsTouched();
        this.form.get('countryDeparture').markAsTouched();
    }


    submit() {
        this.markAllAsTouched();
        const payload = this.form.value;
        let fechas = this.compararFechas(new Date(payload.departure), new Date(payload.arrival));
        let ciudades = this.compararCiudades(parseInt(payload.locDeparture, 10),parseInt(payload.locArrival, 10) );

        if (fechas === 1 && ciudades === 1) {
            payload.departure = moment(payload.departure).format('MM-DD-YYYY HH:mm:ss');
            payload.arrival = moment(payload.arrival).format('MM-DD-YYYY HH:mm:ss');
            payload.plane = { id: parseInt(payload.plane, 10) };
            payload.price = parseInt(payload.price, 10);
            payload.loc_departure = { id: parseInt(payload.locDeparture, 10)};
            payload.loc_arrival = { id: parseInt(payload.locArrival, 10)};

            delete payload.locArrival;
            delete payload.locDeparture;
            delete payload.countryArrival;
            delete payload.countryDeparture;

            if (this.form.valid) {
                this.apiService.postUrl('flights', payload).then(
                    response => {
                        this.mensaje = response;
                        this.messageSuccess = true;
                        setTimeout(()=>{
                            this.messageSuccess = false;
                       }, 3000);
                    }, error => {
                        this.mensaje = error.error.message;
                        this.errores = true;
                        this.messageDanger = true;
                        setTimeout(()=>{
                            this.errores = false;
                            this.messageDanger = false;
                       }, 5000);
                    }
                );
            }
        } else {
            this.errores = true;
            this.visible = true;
            setTimeout(()=>{  
                this.errores = false;
                this.visible = false;
           }, 5000);
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
