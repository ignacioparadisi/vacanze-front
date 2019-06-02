import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableResponsiveReservasComponent  } from "../../blocks/table-responsive-reservas/table-responsive-reservas.component";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-grupo-catorce-restaurant',
  templateUrl: './grupo-catorce-restaurant.component.html',
  styleUrls: ['./grupo-catorce-restaurant.component.scss']
})
export class GrupoCatorceRestaurantComponent implements OnInit {

  constructor(private router: Router){ }
  public form: FormGroup;
  ngOnInit() {
  }

}
