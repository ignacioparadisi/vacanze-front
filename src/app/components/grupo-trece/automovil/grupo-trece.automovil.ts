import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { compararFechas } from '../../../utils/global_functions';
import { LocalStorageService } from '../../../services/local-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'grupo-trece-automovil',
  templateUrl: './grupo-trece.automovil.html',
  styleUrls: ['./grupo-trece.automovil.scss'],
  providers: [ApiService]
})
export class AutomovilGrupoTrece implements OnInit {
  myForm: FormGroup;
  public compararFechas: any;
  public cars = [];
  public countries = [];
  public cities = [];
  public closeResult: string;
  private userId: number;
  private isDataLoaded: boolean = false;
  public show: boolean = false;
  public carreservation = [];
  public carreservations = '';
  public totalcost: number = 0;
  public id: number = null;

  @Output() public actionAlertEventEmitter = new EventEmitter();

  constructor(public fb: FormBuilder, private modalService: NgbModal,
    private apiService: ApiService, private localStorage: LocalStorageService) {
    this.compararFechas = compararFechas;
    this.myForm = this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      fechaOne: ['', [Validators.required]],
      fechaTwo: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getLocalStorage();
    this.initializaDate();
    this.getCountries();
  }

  public getLocalStorage() {
    this.localStorage.getItem('id').subscribe(storedId => {
      if (storedId) {
        this.isDataLoaded = true;
        this.userId = storedId;
        this.getAutomobileReservations();
      }
    })
  }

  getAutomobileReservations() {
    var user_id = this.userId;
    //  const requestURL = "reservationautomobiles/?user="+user_id;
    const requestURL = 'reservationautomobiles/?user=' + this.userId; // Mientras se soluciona el peo
    this.apiService.getUrl(requestURL).then(
      response => {
        console.log(response);
        this.carreservations = response;
      },
      error => {
      }
    );
  }


  getCar(id: number) {
    /*const requestURL = `card/${id}`;
    this.apiService.getUrl(requestURL).then(
        response => {
            this.car = response;
        },
        error => {
            console.log(error);
        }
    );*/
  }

  showTable() {
    this.show = true;
  }

  getCars() {
  }

  getCountries() {
    const requestURL = "locations/countries/";
    this.apiService.getUrl(requestURL).then(
      response => {
        this.countries = response;
      },
      error => {
      }
    );
  }

  getCities() {
    const requestURL = "locations/countries/" + this.myForm.value.country + "/cities/";
    this.apiService.getUrl(requestURL).then(
      response => {
        this.cities = response;
      },
      error => {
      }
    );
  }

  getCarsByCity() {
    this.markAllAsTouched();
    const reservation = this.myForm.value;
    const fechas = this.compararFechas(new Date(reservation.fechaOne), new Date(reservation.fechaTwo));

    if (this.myForm.valid && fechas === 1) {
      const requestURL = "Auto/consultplaceStatus/" + this.myForm.value.city + "/true/";
      this.apiService.getUrl(requestURL).then(
        response => {
          this.cars = response;
        },
        error => {
        }
      );
    }
  }

  public markAllAsTouched() {
    this.myForm.get('country').markAsTouched();
    this.myForm.get('city').markAsTouched();
    this.myForm.get('fechaOne').markAsTouched();
    this.myForm.get('fechaTwo').markAsTouched();
  }

  submit(car: Object) {
    this.markAllAsTouched();
    const reservation = this.myForm.value;
    let fechas = this.compararFechas(new Date(reservation.fechaOne), new Date(reservation.fechaTwo));

    reservation.checkIn = moment(reservation.fechaOne).format('MM-DD-YYYY HH:mm:ss');
    reservation.checkOut = moment(reservation.fechaTwo).format('MM-DD-YYYY HH:mm:ss');
    var fk_user = this.userId;
    reservation.fk_user = fk_user; // esto cuando se solucione el put
    reservation.automobile = car;
    reservation.user = "";
    reservation.id = 0;
    delete reservation.city;
    delete reservation.fechaOne;
    delete reservation.fechaTwo;
    delete reservation.country;

    this.apiService.postUrl('reservationautomobiles', reservation).then(
      response => {
      }, error => {
      }
    );
    /*
           if (fechas === 1) {



                if (this.myForm.valid) {
                    this.apiService.postUrl('reservationautomobiles', reservation).then(
                        response => {
                            console.log(response);
                        }, error => {
                            console.log(error);
                        }
                    );
                }
            } else {
                console.log('La fecha de llegada no puede ser anterior a la de salida.');
            }
            */
  }

  buscador() {
    let payload = this.myForm.value;
    if (this.myForm.valid) {
      this.getCars();
    }
  }

  initializaDate() {
    var today = new Date();
    var dd = today.getDate() + 1;
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var de = '' + dd
    var me = '' + mm
    if (dd < 10) {
      de = '0' + dd
    }
    if (mm < 10) {
      var me = '0' + mm
    }

    var todaye = yyyy + '-' + me + '-' + de;
    document.getElementById("datefieldAlq").setAttribute("min", todaye);
    document.getElementById("datefieldDev").setAttribute("min", todaye);
  }


  open(content, id: number) {
    this.getCar(id);
    this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public messageAlert(event: Object) {
    this.actionAlertEventEmitter.emit(event);
  }

  public openModalActions(event, data: Object, type: string, deleted?: boolean) {
    //   this.submit();
    event.preventDefault();
    let config: SweetAlertOptions = {
      title: '¿' + (deleted ? 'Desea eliminar el ' : 'Desea cambiar el status del ') + type + '?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      type: 'question',
      focusCancel: true
    }
    Swal.fire(config).then(result => {
      this.messageAlert(data);
    });
  }

  public invalid(controlName: string, form: FormGroup) {

    return form.get(controlName).touched && !form.get(controlName).valid;
  }

  public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
  }

  getDaysFrom2Dates(date1: any, date2: any, price: number) {
    const parseDate1 = new Date(date1);
    const parseDate2 = new Date(date2);
    this.totalcost = (parseDate2.getDate() - parseDate1.getDate());
    this.totalcost = Math.round(this.totalcost);
    this.totalcost = price * this.totalcost;
  }

  public updateAutomobileReservation(car: object, id: number) {
    const requestURL = 'reservationautomobiles';
    const reservation = this.myForm.value;
    const fk_user = this.userId;
    reservation.checkIn = moment(reservation.fechaOne).format('MM-DD-YYYY HH:mm:ss');
    reservation.checkOut = moment(reservation.fechaTwo).format('MM-DD-YYYY HH:mm:ss');
    reservation.fk_user = fk_user;
    reservation.automobile = car;
    //  reservation.user="";
    reservation.id = id;
    const fechas = this.compararFechas(new Date(reservation.fechaOne), new Date(reservation.fechaTwo));
    delete reservation.city;
    delete reservation.fechaOne;
    delete reservation.fechaTwo;
    delete reservation.country;
    if (fechas === 1) {
      this.apiService.putUrl(requestURL, reservation).then(
        response => {
          this.getAutomobileReservations();
        }, error => {
          console.error(error);
          this.getAutomobileReservations();
        }
      );
    }
  }

  openCar(content, id: number) {
    this.getCarReservation(id);

    this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getCarReservation(id: number) {
    const requestURL = `reservationautomobiles/${id}`;
    this.apiService.getUrl(requestURL).then(
      response => {
        this.id = response.id;
        this.carreservation = response;
      },
      error => {
      }
    );
  }

  public deleteAutomobileReservation(id: number) {
    const requestURL = `reservationautomobiles/${id}`;
    this.apiService.deleteUrl(requestURL).then(
      response => {
        this.getAutomobileReservations();
      }, error => {
        this.getAutomobileReservations();
      }
    );
  }
}
