import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-travel',
  templateUrl: './detail-travel.component.html',
  styleUrls: ['./detail-travel.component.scss']
})
export class DetailTravelComponent implements OnInit {

  private travel = JSON.parse(localStorage.getItem("travel"));
  private cityId = this.activatedRoute.snapshot.paramMap.get("id");
  restReservations: Array<object>
  autoReservations: Array<object>
  hoteReservations: Array<object>
  fligReservations: Array<object>

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getFligReservations();
  }

  onTabChange(event: NgbTabChangeEvent) {
    switch (event.nextId) {
      case 'flight':
        this.getFligReservations();
        break;
      case 'hotel':
        this.getHoteReservations();
        break;
      case 'vehicle':
        this.getAutoReservations();
        break;
      case 'restaurant':
        this.getRestReservations();
        break;
    }
  }

  getRestReservations() {
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

  getAutoReservations() {
    this.autoReservations = [
      {
        id: 23,
        pickupDate: '2019-07-22',
        returnDate: '2019-07-30',
        auto: {
          id: 12,
          make: 'Ford',
          model: 'Fiesta',
          capacity: 4,
          price: 200,
        }
      },
      {
        id: 25,
        pickupDate: '2019-08-01',
        returnDate: '2019-08-07',
        auto: {
          id: 24,
          make: 'Toyota',
          model: 'Meru',
          capacity: 6,
          price: 500,
        }
      },
      {
        id: 43,
        pickupDate: '2019-08-08',
        returnDate: '2019-08-14',
        auto: {
          id: 65,
          make: 'Chevrolet',
          model: 'Cruze',
          capacity: 5,
          price: 300,
        }
      }
    ]
  }

  getHoteReservations() {
    this.hoteReservations = [
      {
        id: 13,
        checkInDate: '2019-08-01',
        checkOutDate: '2019-07-31',
        num_ppl: 4,
        hotel: {
          id: 45,
          name: 'Ambassador Suites Hotel Caracas',
          capacity: 250,
          tlf: '+582122764200',
          price: 1450,
          address_specs: 'Avenida Francisco de Miranda',
          room_capacity: 4
        }
      },
      {
        id: 13,
        checkInDate: '2019-07-22',
        checkOutDate: '2019-08-14',
        num_ppl: 4,
        hotel: {
          id: 57,
          name: 'Renaissance Caracas',
          capacity: 300,
          tlf: '+582123188130',
          price: 925,
          address_specs: 'Ave Eugenio Mendoza, Con Calle Urdaneta',
          room_capacity: 5
        }
      }
    ]
  }

  getFligReservations() {
    this.fligReservations = [
      {
        id: 64,
        seatNum: 22,
        flight: {
          price: 430,
          arrivalDate: '2019-07-22',
          departureDate: '2019-07-22',
          loc_arrival: {
            id: 54,
            city: 'Caracas',
            country: 'Venezuela',
          },
          loc_departure: {
            id: 56,
            city: 'San Cristobal',
            country: 'Venezuela'
          },
          plane: {
            id: 34,
            capacity: 104,
            model: 'Embraer E-190',
            airline: 'Conviasa'
          }
        }
      },
      {
        id: 64,
        seatNum: 51,
        flight: {
          price: 570,
          arrivalDate: '2019-08-14',
          departureDate: '2019-08-14',
          loc_arrival: {
            id: 54,
            city: 'San Cristobal',
            country: 'Venezuela',
          },
          loc_departure: {
            id: 56,
            city: 'Caracas',
            country: 'Venezuela'
          },
          plane: {
            id: 34,
            capacity: 68,
            model: 'Fokker 50',
            airline: 'Avior'
          }
        }
      }
    ]
  }

  goBack(){
    this.router.navigate(['travel', this.travel.id, 'cities'])
  }

  goDiary(){
    this.router.navigate(['travel', this.travel.id, 'city', this.cityId])
  }
}
