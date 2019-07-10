import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import Swal from 'sweetalert2';
import { Veh_Brand } from '../../../../classes/veh_brand';
import { Veh_Model } from '../../../../classes/veh_model';

@Component({
    selector: 'modify-vehicle',
    templateUrl: './modify-vehicle.html',
    styleUrls: ['./modify-vehicle.scss'],
    providers: [NgbModal]
})

export class ModifyVehicleComponent {

    @Output() spread = new EventEmitter();
    @Input('modelId') modelId: number;
    @Input('brandId') brandId: number;
    @Input('countryId') countryId: number;
    @Input('cityId') cityId: number;
    @Input('licenseV') licenseV: string;
    @Input('priceV') priceV: number;
    @Input('statusV') statusV: number;
    activeModal: NgbModalRef;
    formGroup: FormGroup;
    vehicleForm: FormGroup;
    perolForm: FormGroup
    brands: Array<Veh_Brand>;
    models: Array<Veh_Model>;
    countries: Array<object>;
    cities: Array<object>;
    selectedCountry: boolean = false;

    constructor(private modalService: NgbModal, private apiService: ApiService) {
    }

    open(content) {
        this.perolForm = new FormGroup({
            countryId: new FormControl(this.countryId),
            brandId: new FormControl(this.brandId)
        });
        this.vehicleForm = new FormGroup({
            vehicleModelId: new FormControl(this.modelId, Validators.required),
            vehicleLocationId: new FormControl(this.cityId, Validators.required),
            license: new FormControl(this.licenseV, [Validators.required, Validators.maxLength(10)]),
            price: new FormControl(this.priceV, [Validators.required, Validators.min(1)]),
            status: new FormControl(this.statusV)
        });
        this.selectedCountry = false;
        this.getBrands();
        this.getModels(this.brandId);
        this.getCountries();
        this.activeModal = this.modalService.open(content);
    }

    closeModal() {
        this.activeModal.close();
    }

    getCountries() {
        this.apiService.getUrl('locations/countries').then(
            (resp) => {
                this.countries = resp
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

    getCities(countryId: number) {
        this.selectedCountry = true;
        this.apiService.getUrl('locations/countries/' + countryId + '/cities').then(
            (resp) => {
                this.cities = resp
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

    getModels(brandId: number) {
        this.apiService.getUrl('brands/' + brandId + '/models').then(
            (resp) => {
                this.models = resp
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

    modifyVehicle() {
        this.apiService.postUrl('vehicles', this.vehicleForm.value).then(
            (resp) => {
                this.closeModal();
                Swal.fire({
                    title: '!Éxito¡',
                    text: 'El vehículo se creó satisfactoriamente.',
                    type: 'success'
                });
                this.spread.emit();
            },
            (fail) => {
                Swal.fire({
                    title: 'Codigo: ' + fail.status,
                    text: fail.error,
                    type: 'error',
                })
            }
        );
    }

}