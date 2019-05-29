import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-travel',
    templateUrl: './travel.component.html',
    styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {

    private travels: Array<object>;
    private errorResponse: String;

    constructor(private router: Router, private apiService: ApiService) {
    }

    ngOnInit() {
        this.getTravels();
    }

    private getTravels() {
        this.apiService.getUrl('users/{user}/travels', ['5']).then(
            (resp) => this.travels = resp,
            (fail) => {
                this.errorResponse = fail.error;
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
