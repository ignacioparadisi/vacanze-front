import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { COUNTRYS, HOURS, MINUTES } from '../../../../utils/select.util';
import { ApiService } from '../../../../services/api.service';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-new-grupo-tres',
  templateUrl: './new.grupo-tres.html',
  styleUrls: ['./new.grupo-tres.scss']
})
export class NewGrupoTres implements OnInit {
    closeResult: string;
    time = {hour: 13, minute: 30};
    public countrys = COUNTRYS;
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
    }

    public getAirplanes() {
        this.apiService.getUrl('/api/airplanes/').subscribe(
            response => {
            this.airplanes = response.result.airplanes;
            },
            error => {
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
            if (this.form.valid) {
            this.apiService.postUrl('api/blabla.', payload).subscribe(
                response => {
                console.log('éxitoso');
                },
                error => {
                console.error(this.form);
                }
            );
            } else {
                console.error(this.form);
            }
        } else {
            this.notifier.notify( 'success', 'You are awesome! I mean it!' );
            console.log("Fechas es falso");
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
