import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { compararFechas } from '../../../utils/global_functions';
import * as moment from 'moment';

@Component({
    selector: 'grupo-trece-habitacion',
    templateUrl: './grupo-trece.habitacion.html',
    styleUrls: ['./grupo-trece.habitacion.scss'],
    providers: [ApiService]
})
export class HabitacionGrupoTrece implements OnInit {
    myForm: FormGroup;
    public compararFechas;
    public Habitacion = [];
    public countries = [];
    public cities = [];
    public hotels = [];
    public closeResult: string;

    @Output() public actionAlertEventEmitter = new EventEmitter();

    constructor(public fb: FormBuilder, private modalService: NgbModal, private apiService: ApiService) {
        this.compararFechas = compararFechas;
        this.myForm = this.fb.group({
            country: ['', [Validators.required]],
            city: ['', [Validators.required]],
            fechaOne: ['', [Validators.required]],
            fechaTwo: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.initializaDate();
        this.getCountries();
    }

    getHabitacion(id: number) {
        console.log("Me traigo los datos con el id:" + id + " tal");
        /*const requestURL = `Habitaciond/${id}`;
        this.apiService.getUrl(requestURL).then(
            response => {
                this.Habitacion = response;
            },
            error => {
                console.log(error);
            }
        );*/
    }

    getHabitacions() {
        console.log("Estoy en getHabitacions");
    }

    getCountries(){
        const requestURL = "locations/countries/";
        this.apiService.getUrl(requestURL).then(
            response => {
                this.countries = response;
            },
            error => {
                console.log(error);
            }
        );
    }

    getCities(){
        const requestURL = "locations/countries/"+this.myForm.value.country+"/cities/";
        this.apiService.getUrl(requestURL).then(
            response => {
                this.cities = response;
            },
            error => {
                console.log(error);
            }
        );
    }

    getHotelsByCity(){
        const requestURL = "hotels/?location="+this.myForm.value.city;
        this.apiService.getUrl(requestURL).then(
            response => {
                this.hotels = response;
            },
            error => {
                console.log(error);
            }
        );
    }

    public markAllAsTouched() {
        this.myForm.get('locDeparture').markAsTouched();
        this.myForm.get('locArrival').markAsTouched();
        this.myForm.get('plane').markAsTouched();
        this.myForm.get('price').markAsTouched();
        this.myForm.get('departure').markAsTouched();
        this.myForm.get('arrival').markAsTouched();
    }

    submit() {
        this.markAllAsTouched();
        const payload = this.myForm.value;
        let fechas = this.compararFechas(new Date(payload.departure), new Date(payload.arrival));

        if (fechas === 1) {

            if (this.myForm.valid) {
                this.apiService.postUrl('reservationrooms', payload).then(
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

    buscador() {
        let payload = this.myForm.value;
        if (this.myForm.valid) {
            console.log("Buscando");
            this.getHabitacions();
        }
    }

    initializaDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var de = '' +dd
        var me = '' +mm
         if(dd<10){
                de='0'+dd
            } 
            if(mm<10){
               var me='0'+mm
            } 
        
       var todaye = yyyy+'-'+me+'-'+de;
        document.getElementById("datefieldAlq").setAttribute("min", todaye);
        document.getElementById("datefieldDev").setAttribute("min", todaye);
      }

    open(content, id: number) {
        this.getHabitacion(id);
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

    public messageAlert(event: Object){
        this.actionAlertEventEmitter.emit(event);
      }

    public openModalActions(event, data: Object, type: string, deleted? : boolean){
        event.preventDefault();
        let config: SweetAlertOptions = {
          title: '¿' + (deleted ? 'Desea eliminar el ':'Desea cambiar el status del ') + type + '?',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          showCancelButton: true,
          type: 'question',
          focusCancel: true
        }
        Swal.fire(config).then(result => {
          this.messageAlert(data);
        })
      }

}
