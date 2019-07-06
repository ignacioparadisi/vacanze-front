import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'create-model',
    templateUrl: './create-model.html',
    styleUrls: ['./create-model.scss'],
    providers: [NgbModal]
})

export class CreateModelComponent {

    @Output() spread = new EventEmitter();
    activeModal: NgbModalRef;
    formGroup: FormGroup;
    modelForm: FormGroup;
    brands: Array<Object>;


    constructor(private modalService: NgbModal, private apiService: ApiService) {
    }

    open(content) {
        this.modelForm = new FormGroup({
            brandId: new FormControl('', Validators.required),
            modelName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
            capacity: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
            picture: new FormControl('')
        });
        this.getBrands();
        this.activeModal = this.modalService.open(content);
    }

    closeModal() {
        this.activeModal.close();
    }

    getBrands() {
        this.apiService.getUrl('brands').then(
            (resp) => {
                this.brands = resp
            },
            (fail) => {
                if (fail.error) {
                    Swal.fire({
                        title: fail.error,
                        type: 'error',
                    })
                } else {
                    Swal.fire({
                        title: 'Error: ' + fail.status,
                        text: fail.name + '. ' + fail.statusText,
                        type: 'error',
                    })
                }
            }
        );
    }

    createModel() {
        console.log(this.modelForm.value);
        this.apiService.postUrl('models', this.modelForm.value).then(
            (resp) => {
                this.closeModal();
                Swal.fire({
                    title: '!Éxito¡',
                    text: 'El modelo se creó satisfactoriamente.',
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