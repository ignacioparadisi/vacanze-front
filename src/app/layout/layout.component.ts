import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  StatusHeader = false;
  StatusSideBar = false;
  StatusLogin = true;
  StatusMain = true;
  collapedSideBar: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    // var rol = localStorage.getItem('rol');
    // var email = localStorage.getItem('Email');
    // if (isNullOrUndefined(rol) || isNullOrUndefined(email)) {
    //   this.router.navigate(['/grupo-uno']);
    // }
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

}
