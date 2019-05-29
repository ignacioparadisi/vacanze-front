import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/core/src/util';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  StatusHome = true;
  constructor(private router: Router) { }

  ngOnInit() {
    var rol = localStorage.getItem('rol');
    var email = localStorage.getItem('Email');
    if (isNullOrUndefined(rol) || isNullOrUndefined(email)) {
      this.router.navigate(['/grupo-uno']);
    }
  }

}
