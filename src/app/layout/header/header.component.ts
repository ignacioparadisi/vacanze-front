import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../layout.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RegisterUserComponent} from "../../components/users/register-user/register-user.component";
import {LocalStorageService} from "../../services/local-storage.service";
import {ApiService} from "../../services/api.service";
import Swal, {SweetAlertOptions} from "sweetalert2";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;

    constructor(public router: Router, private layout: LayoutComponent,
                private modalService: NgbModal, private localService: LocalStorageService,
                private apiService: ApiService) {

        this.router.events.subscribe(val => {
            if (
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    onClickMe() {

        this.layout.StatusMain = true;
        localStorage.removeItem('Email');
        localStorage.removeItem('rol');
        localStorage.removeItem('token');
        this.router.navigate(['/grupo-uno']);
    }

    openProfileModal() {
      this.localService.getItem("id").subscribe(id => {
        this.apiService.getUrl(`users/${id}`).then(user => {
          var modalRef = this.modalService.open(RegisterUserComponent, {centered: true});
          modalRef.componentInstance.isClient = true;
          modalRef.componentInstance.user = user;
        }).catch(error => {
          if (error.status == 0) {
            this.showErrorAlert("Error conectándose al servidor");
          } else {
            this.showErrorAlert(error.error);
          }
        });
      });
    }

    private showErrorAlert(error: string) {
        let config: SweetAlertOptions = {
          title: error,
          type: 'error',
          showConfirmButton: false,
          timer: 1800
        };
        Swal.fire(config);
      }

}
