import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    buscador(){
        let payload = this.myForm.value;
        if (this.myForm.valid){
            console.log("Buscando");
            this.getCars();
        }
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

}
