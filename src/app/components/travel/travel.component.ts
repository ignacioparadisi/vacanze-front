import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-travel',
    templateUrl: './travel.component.html',
    styleUrls: ['./travel.component.scss'],
    providers: [ApiService]
})
export class TravelComponent implements OnInit {

    private travels: Array<object>;

    constructor(private router: Router, private apiService: ApiService) {
    }

    ngOnInit() {
        this.getTravels();
    }

    private getTravels() {
        this.apiService.getUrl('users/{user}/travels', ['5']).then(
            (resp) => this.travels = resp,
            (fail) => {
                Swal.fire({
                    title: 'Error: ' + fail.status,
                    text: fail.name + '. ' + fail.statusText,
                    type: 'error',
                })
            }
        );
    }

    private travelDetails(id: number) {
        this.router.navigate(['travel', id])
    }

    private travelDelete(id: number) {
        console.log(id);
    }
}
