import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { COUNTRYS, HOURS, MINUTES } from '../../../../utils/select.util';


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
    public form: FormGroup;
    public contactList: FormArray;

    constructor(private modalService: NgbModal, private fb: FormBuilder) {
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

    submit() {
        console.log(this.form.value);
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
