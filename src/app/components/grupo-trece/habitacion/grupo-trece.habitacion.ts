import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
    public closeResult: string;

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

    buscador() {
        let payload = this.myForm.value;
        if (this.myForm.valid) {
            console.log("Buscando");
            this.getHabitacions();
        }
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

}
