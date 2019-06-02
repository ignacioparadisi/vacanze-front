import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../../../layout/layout.component';
import { GrupoUnoComponent } from '../grupo-uno.component';
import { LocalStorageService } from '../../../services/local-storage.service';
import { User } from "../../../classes/user";
import { RegisterUserComponent } from "../../users/register-user/register-user.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService, SidebarComponent]
})


export class LoginComponent implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild('Recovery') Recovery: ElementRef;
  isPushed = true;
  isShow = false;
  isShowLogin = true;
  isShowPmodal = false;

  TodoForm: FormGroup;
  StatusLogin = true;
  formModel = {
    Email: '',
    Password: ''
  }

  constructor(private service: ApiService,
    private storage: LocalStorageService,
    private localStorage: LocalStorageService,
    private father: LayoutComponent,
    private router: Router,
    private landing: GrupoUnoComponent,
    private modalService: NgbModal,
    private sideBar: SidebarComponent) {

  }

  ngOnInit() {

  }
  onSubmit(form: NgForm) {
    this.isPushed = false;
    this.isShow = true;
    this.isShowLogin = false;
    this.service.postUrl('Login/Login', form.value).then(
      (res: any) => {

        this.storage.setItem('id', res.id).subscribe(id => {
          console.log('Id del usuario por bdd', id)
        });
        this.storage.setItem('rol', res.roles).subscribe(roles => {
          console.log('Roles del usuario', roles)
        });

        this.storage.setItem('Email', res.email).subscribe(email => {
          console.log('Emai del usuario', email)
        });
        if (res.roles[0].id == 1) {
          this.StatusLogin = false;
          this.father.StatusHeader = true;
          this.isPushed = true;
          this.isShow = false;
          this.isShowLogin = true;
          this.router.navigateByUrl('/landing');
        } else if (res.roles[0].id != 1) {
          /* for (var i = 0; i < res.roles.length; i++) {
             if (res.roles[i].name == 3) {
               this.sideBar.isLanding = false;
             }
           }*/
          this.father.StatusHeader = true;
          this.father.StatusSideBar = true;
          this.StatusLogin = false;
          this.isPushed = true;
          this.isShow = false;
          this.isShowLogin = true;
          this.router.navigateByUrl('/landing');
        }
      }, error => {
        if (error.status == 400 || error.status != 200)
          alert("Ha ocurrido un error")
        this.isPushed = true;
        this.isShow = false;
        this.isShowLogin = true;
      }
    );

  }
  RecoverySubmit(recoveryForm: NgForm) {
    this.isShowPmodal = true
    this.service.postUrl('Email/Email', recoveryForm.value).then(
      (res: any) => {
        this.storage.setItem('Email', res.email).subscribe(email => {
          console.log('Email del usuario', email)
        });
        if (res.email) {
          this.StatusLogin = false;
          this.father.StatusHeader = true;
          this.father.StatusMain = false;
          alert("Se le ha enviado un correo con exito")
          this.isShowPmodal = false;
          this.router.navigateByUrl('/home');
        }
      },
      error => {
        if (error.status == 400 || error.status != 200) {
          alert("Ups....There is a trouble")
          this.isShowPmodal = false;
        } else if (error.status == 200)
          alert("New password have sent to your email")
        this.isShowPmodal = false;
      }
    );
  }

  openAddUserModal(user?: User) {
    const modalRef = this.modalService.open(RegisterUserComponent, { centered: true });
    modalRef.componentInstance.isClient = true;
  }
}
