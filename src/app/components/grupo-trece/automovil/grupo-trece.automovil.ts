import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { compararFechas } from '../../../utils/global_functions';
import * as moment from 'moment';

@Component({
    selector: 'grupo-trece-automovil',
    templateUrl: './grupo-trece.automovil.html',
    styleUrls: ['./grupo-trece.automovil.scss'],
    providers: [ApiService]
})
export class AutomovilGrupoTrece implements OnInit {
    myForm: FormGroup;
    public compararFechas;
    public car = [];
    public countries = [];
    public cities = [];
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
        this.getCountries();
        this.initializaDate();
    }

    getCar(id: number) {
        console.log("Me traigo los datos con el id:" + id + " tal");
        /*const requestURL = `card/${id}`;
        this.apiService.getUrl(requestURL).then(
            response => {
                this.car = response;
            },
            error => {
                console.log(error);
            }
        );*/
    }

    getCars(){
        console.log("Estoy en getCars");
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

    buscador(){
        let payload = this.myForm.value;
        if (this.myForm.valid){
            console.log("Buscando");
            this.getCars();
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
        this.getCar(id);
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
