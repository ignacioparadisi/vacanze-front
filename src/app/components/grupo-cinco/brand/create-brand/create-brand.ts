import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'create-brand',
    templateUrl: './create-brand.html',
    styleUrls: ['./create-brand.scss'],
    providers: [NgbModal]
})

export class CreateBrandComponent {

    @Output() spread = new EventEmitter();
    activeModal: NgbModalRef;
    public formGroup: FormGroup;
    brandForm: FormGroup;


    constructor(private modalService: NgbModal, private apiService: ApiService) {

        this.brandForm = new FormGroup({
            brandName: new FormControl('', Validators.required)
        });
    }

    open(content) {
        this.activeModal = this.modalService.open(content);
    }

    closeModal() {
        this.activeModal.close();
    }

    createBrand() {
        this.apiService.postUrl('brands', this.brandForm.value).then(
            (resp) => {
                this.closeModal();
                Swal.fire({
                    title: '!Éxito¡',
                    text: 'La marca se creó satisfactoriamente.',
                    type: 'success'
                });
                this.spread.emit();
            },
            (fail) => {
                console.log(fail);
                Swal.fire({
                    title: 'Codigo: ' + fail.status,
                    text: fail.error,
                    type: 'error',
                })
            }
        );
    }

}