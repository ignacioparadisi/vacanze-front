import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-travel',
    templateUrl: './travel.component.html',
    styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {

    private travels: Array<Object>;

    constructor() {
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
}
