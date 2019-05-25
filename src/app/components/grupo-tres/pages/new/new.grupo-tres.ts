import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { COUNTRYS, HOURS, MINUTES } from '../../../../utils/select.util';
import { ApiService } from '../../../../services/api.service';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';
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
    private readonly notifier: NotifierService;

    constructor(private modalService: NgbModal, private fb: FormBuilder, private apiService: ApiService, notifierService: NotifierService) {
        this.notifier = notifierService;
    }

    ngOnInit() {
        this.form = this.fb.group({
            countryOrigen: [null, Validators.compose([Validators.required])],
            cityOrigen: [null, Validators.compose([Validators.required])],
            countryLlegada: [null, Validators.compose([Validators.required])],
            cityLlegada: [null, Validators.compose([Validators.required])],
            airplane: [null, Validators.compose([Validators.required])],
            price: [null, Validators.compose([Validators.required])],
            dateSalida: [null, Validators.compose([Validators.required])],
            dateLlegada: [null, Validators.compose([Validators.required])],
            durationHours: [null, Validators.compose([Validators.required])],
            durationMinutes: [null, Validators.compose([Validators.required])],
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
        const requestURL = 'http://country.io/names.json';
        this.apiService.getUrl(requestURL).then(
            response => {
                this.countries = response;
            }, error => {
                console.log(error);
            }
        );
    }

    public markAllAsTouched() {
        this.form.get('countryOrigen').markAsTouched();
        this.form.get('cityOrigen').markAsTouched();
        this.form.get('countryLlegada').markAsTouched();
        this.form.get('airplane').markAsTouched();
        this.form.get('price').markAsTouched();
        this.form.get('cityLlegada').markAsTouched();
        this.form.get('dateSalida').markAsTouched();
        this.form.get('dateLlegada').markAsTouched();
        this.form.get('durationHours').markAsTouched();
        this.form.get('durationMinutes').markAsTouched();
    }

    compare(salida: number, llegada: number) {
        if (salida < llegada) { return 1; } else { return -1; }
    }

    submit() {
        this.markAllAsTouched();
        const payload = this.form.value;
        payload.salida = moment(new Date(payload.dateSalida), 'DD/MM/YYYY');
        payload.llegada = moment(new Date(payload.dateLlegada), 'DD/MM/YYYY');
        var salida = parseInt(payload.salida.date() + (payload.salida.month() + 1), 10);
        var llegada = parseInt(payload.llegada.date() + (payload.llegada.month() + 1), 10);
        var fechas = this.compare(salida, llegada);
        if (fechas === 1) {
            if (this.form.valid) { ///api/flights
                console.log ('El formulario está completo');
            }
        } else {
            this.notifier.notify( 'success', 'La fecha de llegada no puede ser anterior a la de salida.' );
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
