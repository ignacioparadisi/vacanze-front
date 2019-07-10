import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import Swal from 'sweetalert2';
import { Veh_Brand } from '../../../../classes/veh_brand';
import { Veh_Model } from '../../../../classes/veh_model';

@Component({
    selector: 'modify-model',
    templateUrl: './modify-model.html',
    styleUrls: ['./modify-model.scss'],
    providers: [NgbModal, ApiService]
})

export class ModifyModelComponent {

    @Output() spread = new EventEmitter();
    @Input('models') models: Array<Veh_Model>;
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
        if (!this.models.find(x => this.modelName == this.modelForm.get("modelName").value))
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
        if (this.models.find(x => this.modelName == this.modelForm.get("modelName").value) && this.modelForm.dirty)
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
        else
            Swal.fire({
                title: 'Codigo: 405',
                html: 'El modelo <b>' + this.modelName + '</b> con esas especificaciones ya existe.',
                type: 'error',
            })
    }

}