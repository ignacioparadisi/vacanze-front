import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diary-travel',
  templateUrl: './diary-travel.component.html',
  styleUrls: ['./diary-travel.component.scss']
})
export class DiaryTravelComponent implements OnInit {

  private cityId: string = this.activatedRoute.snapshot.paramMap.get("cityId");
  private travelId: string = this.activatedRoute.snapshot.paramMap.get("travelId");
  diaryComments: Array<object>

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.diaryComments = [
      {
        id: 1,
        descr: 'Sin turbulencias, el viaje fue perfecto',
        timestamp: '2019-07-22 19:10:25',
        tra_res: {
          id: 2,
          res_fli: {
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
          }
        }
      },
      {
        id: 5,
        descr: 'La piscina no estaba disponible',
        timestamp: '2019-08-01 09:15:25',
        tra_res: {
          id: 2,
          res_roo: {
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
          }
        }
      },
      {
        id: 8,
        descr: 'El aire acondicionado servía pero no enfriaba',
        timestamp: '2019-07-30 09:15:25',
        tra_res: {
          id: 2,
          res_aut: {
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
          }
        }
      },
      {
        id: 15,
        descr: 'La comida estaba divina',
        timestamp: '2019-07-21 21:15:25',
        tra_res: {
          id: 2,
          res_rest: {
            id: 2,
            date: '2019-07-21',
            capacity: 2,
            restaurant:
            {
              id: 42,
              businessname: 'La Posada Del Pollo',
              address_specs: 'Avenida Panteón',
              specialty: 'Pollos',
              tlf: '+582125525058',
              price: 150,
            }
          }
        }
      }
    ]
  }

  goBack() {
    this.router.navigate(['travel', this.travelId, 'city', this.cityId])
  }
}
