import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../../services/local-storage.service';
import { Travel } from '../../classes/travel';
import { delay } from 'q';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss'],
  providers: [ApiService]
})
export class TravelComponent implements OnInit {

  private userId: string;
  private travels: Array<Travel>;
  aux:string ;
  constructor(private router: Router, private apiService: ApiService, private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.getTravels();
  }

  private getTravels() {
    this.localStorage.getItem("id").subscribe(data => {
      if (data) {
        this.userId = data
        this.apiService.getUrl('users/{user}/travels', [this.userId]).then(
          (resp) => {
            this.travels = resp
            this.travels.forEach((row) => {
              row.init = row.init.substring(0,10)
              row.end = row.end.substring(0,10)
            })
          },
          (fail) => {
            if (fail.error) {
              Swal.fire({
                title: fail.error,
                type: 'info',
              })
            } else {
              Swal.fire({
                title: 'Error: ' + fail.status,
                text: fail.name + '. ' + fail.statusText,
                type: 'error',
              })
            }
          }
        );
      }
    })
  }

  private travelCities(travel) {
    localStorage.setItem("travel", JSON.stringify(travel));
    this.router.navigate(['travel', travel.id, 'cities'])
  }


  public travelDelete ( travel ) {
  
       
       this.aux ='Travel/delete/'+ travel.id;
    this.apiService.deleteUrl(this.aux).then(
      async (resp) => {
        
        
        Swal.fire({
          title: '!Éxito¡',
          text: 'El viaje se modificó satisfactoriamente.',
          type: 'success'
        });
        await delay(1000);
        window.location.reload()
      },
      (fail) => {
        Swal.fire({
          title: 'Error: ' + fail.status,
          text: fail.name + '. ' + fail.statusText,
          type: 'error',
        })
      }
    );

  }
}
