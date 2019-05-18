import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/classes/role';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-hotels-backoffice',
  templateUrl: './view-hotels-backoffice.component.html',
  styleUrls: ['./view-hotels-backoffice.component.scss']
})
export class ViewHotelsBackofficeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
