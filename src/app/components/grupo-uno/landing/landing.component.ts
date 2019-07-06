import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { LayoutComponent } from '../../../layout/layout.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private local: LocalStorageService, private father: LayoutComponent) { }

  ngOnInit() {
    this.local.removeItem('flag');
    this.local.getItem('id').subscribe(id => {
      if (id) {
        this.father.StatusHeader = true;
      }
      this.local.getItem('rol').subscribe(roles => {
        if (roles.length != 0) {
          if (roles[0]._Id != 1) {
            this.father.StatusSideBar = true;
          }
        }
      })
    })
  }

}
