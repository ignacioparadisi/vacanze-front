import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-travel',
  templateUrl: './detail-travel.component.html',
  styleUrls: ['./detail-travel.component.scss'],
  providers: [NgbModal, ApiService]
})
export class DetailTravelComponent implements OnInit {

  private travel = JSON.parse(localStorage.getItem("travel"));
  private cityId: string = this.activatedRoute.snapshot.paramMap.get("cityId");
  activeModal: NgbModalRef;
  commentForm: FormGroup;
  restReservations: Array<object>
  autoReservations: Array<object>
  hoteReservations: Array<object>
  fligReservations: Array<object>
  activeId: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private modalService: NgbModal, private apiService: ApiService) { }

  ngOnInit() {
    this.getFligReservations();
    this.activeId = 'flight';
  }

  onTabChange(event: NgbTabChangeEvent) {
    switch (event.nextId) {
      case 'flight':
        this.activeId = event.nextId
        this.getFligReservations();
        break;
      case 'hotel':
        this.activeId = event.nextId
        this.getHoteReservations();
        break;
      case 'vehicle':
        this.activeId = event.nextId
        this.getAutoReservations();
        break;
      case 'restaurant':
        this.activeId = event.nextId
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
          businessname: 'Hereford Grill',
          address_specs: 'Entre calles Caroní y Nueva York, Calle Madrid',
          specialty: 'Carnes',
          tlf: '+582129929664',
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
          businessname: 'La Posada Del Pollo',
          address_specs: 'Avenida Panteón',
          specialty: 'Pollos',
          tlf: '+582125525058',
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

  goBack() {
    this.router.navigate(['travel', this.travel.id, 'cities'])
  }

  goDiary() {
    this.router.navigate(['travel', this.travel.id, 'city', this.cityId, 'diary'])
  }

  open(content, id: number) {
    this.activeModal = this.modalService.open(content);
    this.commentForm = new FormGroup({
      travelId: new FormControl(this.travel.id),
      reservationId: new FormControl(id),
      comment: new FormControl('', Validators.required)
    })
  }

  closeModal() {
    this.activeModal.close();
  }

  addComment() {
    console.log(this.commentForm.value)
    /*this.apiService.postUrl('travels/{travelId}/locations', this.selectedCities, [String(this.travel.id)]).then(
      (resp) => {
        this.closeModal();
        Swal.fire({
          title: '!Éxito¡',
          text: 'Las ciudades se añadieron satisfactoriamente.',
          type: 'success'
        });
        this.spread.emit();
      },
      (fail) => {
        Swal.fire({
          title: 'Error: ' + fail.status,
          text: fail.name + '. ' + fail.statusText,
          type: 'error',
        })
      }
    );*/
  }
}
