import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-fleet',
    templateUrl: './fleet.component.html',
    styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {

    vehicles: Array<object>

    constructor() { }

    ngOnInit() {
        this.getVehicles();
    }

    getVehicles() {
        this.vehicles = [
            {
                id: 1,
                license: '1A5S4D1',
                price: 13000,
                status: true,
                location:
                {
                    id: 35,
                    city: 'Caracas'
                },
                model:
                {
                    id: 1,
                    capacity: 5,
                    name: 'Meru',
                    photo: '',
                    brand:
                    {
                        id: 1,
                        name: 'Toyota'
                    }
                }
            },
            {
                id: 2,
                license: '45SDAW2',
                price: 565,
                status: false,
                location:
                {
                    id: 35,
                    city: 'Caracas'
                },
                model:
                {
                    id: 1,
                    capacity: 4,
                    name: 'Corolla',
                    photo: '',
                    brand:
                    {
                        id: 1,
                        name: 'Toyota'
                    }
                }
            },
        ]
    }

    changeStatus(vehicleId: number) {
        console.log(vehicleId);
    }

}
