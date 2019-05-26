import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-travel',
    templateUrl: './travel.component.html',
    styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {

    private travels: Array<Object>;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.getTravels();
    }

    private getTravels() {
        this.travels = [
            {
                "id": 1,
                "name": "Surf Trip",
                "description": "Fusce non ultricies tellus. Aenean fermentum libero eu eleifend tincidunt. Duis  ultrices nisi at cursus."
            },
            {
                "id": 2,
                "name": "Family Trip",
                "description": ""
            },
            {
                "id": 3,
                "name": "Business Trip",
                "description": "Fusce facilisis imperdiet feugiat. Nam blandit malesuada vehicula. Maecenas quis volutpat ex."
            },
            {
                "id": 4,
                "name": "Cruise",
                "description": "Mauris augue sem, gravida non porta convallis, elementum luctus dui."
            },
            {
                "id": 5,
                "name": "Business Trip",
                "description": "Fusce facilisis imperdiet feugiat. Nam blandit malesuada vehicula. Maecenas quis volutpat ex."
            },
            {
                "id": 6,
                "name": "Business Trip",
                "description": "Fusce facilisis imperdiet feugiat. Nam blandit malesuada vehicula. Maecenas quis volutpat ex."
            }
        ];
    }

    private travelDetails( id: number ){
        this.router.navigate(['travel', id])
    }

    private travelDelete( id: number){
        //llamar al service para borrar el travel
    }
}
