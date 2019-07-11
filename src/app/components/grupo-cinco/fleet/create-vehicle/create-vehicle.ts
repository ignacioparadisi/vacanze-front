import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import Swal from 'sweetalert2';
import { Veh_Brand } from '../../../../classes/veh_brand';
import { Veh_Model } from '../../../../classes/veh_model';

@Component({
    selector: 'create-vehicle',
    templateUrl: './create-vehicle.html',
    styleUrls: ['./create-vehicle.scss'],
    providers: [NgbModal, ApiService]
})

export class CreateVehicleComponent {

    @Output() spread = new EventEmitter();
    activeModal: NgbModalRef;
    formGroup: FormGroup;
    vehicleForm: FormGroup;
    brands: Array<Veh_Brand>;
    models: Array<Veh_Model>;
    countries: Array<object>;
    cities: Array<object>;
    selectedCountry: boolean = false;
    selectedBrand: boolean = false;

    constructor(private modalService: NgbModal, private apiService: ApiService) {
    }

    open(content) {
        this.vehicleForm = new FormGroup({
            vehicleModelId: new FormControl('', Validators.required),
            vehicleLocationId: new FormControl('', Validators.required),
            license: new FormControl('', [Validators.required, Validators.maxLength(10)]),
            price: new FormControl('', [Validators.required, Validators.min(1)]),
            status: new FormControl(true)
        });
        this.selectedBrand = false;
        this.selectedCountry = false;
        this.getBrands();
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
        this.selectedBrand = true;
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

    createVehicle() {
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