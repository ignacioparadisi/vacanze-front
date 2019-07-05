import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'modify-brand',
    templateUrl: './modify-brand.html',
    styleUrls: ['./modify-brand.scss'],
    providers: [NgbModal]
})

export class ModifyBrandComponent {

    @Output() spread = new EventEmitter();
    @Input('brandName') brandName: string;
    @Input('brandId') brandId: number;
    activeModal: NgbModalRef;
    public formGroup: FormGroup;
    brandForm: FormGroup;


    constructor(private modalService: NgbModal, private apiService: ApiService) {
    }

    open(content) {
        this.activeModal = this.modalService.open(content);
        this.brandForm = new FormGroup({
            id: new FormControl(this.brandId),
            brandName: new FormControl(this.brandName, Validators.required)
        });
    }

    closeModal() {
        this.activeModal.close();
    }

    createBrand() {
        this.apiService.putUrl('brands', this.brandForm.value).then(
            (resp) => {
                this.closeModal();
                Swal.fire({
                    title: '!Éxito¡',
                    text: 'La marca se modificó satisfactoriamente.',
                    type: 'success'
                });
                this.spread.emit();
            },
            (fail) => {
                Swal.fire({
                    title: 'Codigo: ' + fail.status,
                    text: fail.error.title,
                    type: 'error',
                })
            }
        );
    }

}