import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-fleet',
    templateUrl: './fleet.component.html',
    styleUrls: ['./fleet.component.scss'],
    providers: [ApiService]
})
export class FleetComponent implements OnInit {

    vehicles: Array<object>
    searchText : string;
    swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary mr-2',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false,
    })

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.getVehicles();
    }

    getVehicles() {
        this.apiService.getUrl('vehicles').then(
            (resp) => {
                this.vehicles = resp;
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

    changeStatus(vehicleId: number, vehicleLicense: string, vehicleStatus: boolean) {
        if (vehicleStatus) vehicleStatus = false;
        else vehicleStatus = true;
        this.swalWithBootstrapButtons.fire({
            title: '¿Estás seguro?',
            html:
                'Cambiar el estatus del vehículo con matrícula: <b>' + vehicleLicense +
                '</b>',
            type: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.apiService.putUrl('vehicles/' + vehicleId + '/update?status=' + vehicleStatus).then(
                    (resp) => {
                        Swal.fire({
                            title: '!Éxito¡',
                            text: 'El estatus se cambió satisfactoriamente.',
                            type: 'success'
                        });
                        this.getVehicles();
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
        })
    }

}
