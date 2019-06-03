import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';


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

  constructor(private router: Router, private local: LocalStorageService) { }

  ngOnInit() {
    this.StatusMain = false;
    this.local.getItem('id').subscribe(id => {
      if (id) {
        this.StatusMain = true;
        this.StatusHeader = true;
        this.local.getItem('rol').subscribe(roles => {
          for (var i = 0; i <= roles.length; i++) {
            if (roles[i].id != 1 && localStorage.getItem('flag') != '1') {
              this.StatusSideBar = true;
            }
            localStorage.removeItem('flag');
          }
        })
      } else {

        this.StatusMain = true;
        this.StatusSideBar = false;
        this.StatusHeader = false;
        this.router.navigateByUrl('/grupo-uno')
      }
    })
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

}
