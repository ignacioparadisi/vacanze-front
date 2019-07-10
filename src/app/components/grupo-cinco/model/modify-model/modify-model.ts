import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import Swal from 'sweetalert2';
import { Veh_Brand } from '../../../../classes/veh_brand';

@Component({
    selector: 'modify-model',
    templateUrl: './modify-model.html',
    styleUrls: ['./modify-model.scss'],
    providers: [NgbModal, ApiService]
})

export class ModifyModelComponent {

    @Output() spread = new EventEmitter();
    @Input('models') models: string;
    @Input('modelName') modelName: string;
    @Input('modelId') modelId: number;
    @Input('capacity') capacity: number;
    @Input('brandId') brandId: number;
    @Input('picture') picture: number;
    activeModal: NgbModalRef;
    public formGroup: FormGroup;
    modelForm: FormGroup;
    brands: Array<Veh_Brand>;

    constructor(private modalService: NgbModal, private apiService: ApiService) {
    }

    open(content) {
        this.modelForm = new FormGroup({
            id: new FormControl(this.modelId, Validators.required),
            brandId: new FormControl(this.brandId, Validators.required),
            modelName: new FormControl(this.modelName, [Validators.required, Validators.maxLength(40)]),
            capacity: new FormControl(this.capacity, [Validators.required, Validators.min(1), Validators.max(10)]),
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

    modifyModel() {
        this.apiService.putUrl('models', this.modelForm.value).then(
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