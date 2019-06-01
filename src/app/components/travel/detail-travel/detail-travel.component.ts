import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-travel',
  templateUrl: './detail-travel.component.html',
  styleUrls: ['./detail-travel.component.scss']
})
export class DetailTravelComponent implements OnInit {

  restReservations: Array<object>

  constructor() { }

  ngOnInit() {
  }

  onTabChange(event: NgbTabChangeEvent) {
    switch (event.nextId) {
      case 'fly':
        break;
      case 'hotel':
        break;
      case 'vehicle':
        break;
      case 'restaurant':
        this.getResRest();
        break;
    }
  }

  getResRest() {
    this.restReservations = [
      {
        id: 1,
        date: '2019-07-20',
        capacity: 3,
        restaurant:
        {
          id: 22,
          businessname: 'El rey de las carnes',
          address_specs: 'Villa de cura via Bella Vista ',
          specialty: 'Carnes',
          tlf: '+582443541268',
          price: 200,
        }
      },
      {
        id: 2,
        date: '2019-07-21',
        capacity: 2,
        restaurant:
        {
          id: 42,
          businessname: 'Pollo los llanos',
          address_specs: 'Intercomunal de Cagua',
          specialty: 'Pollos',
          tlf: '+582445124365',
          price: 150,
        }
      },
    ]
  }
}
