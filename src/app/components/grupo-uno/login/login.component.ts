import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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
    private sideBar: SidebarComponent,
    private local: LocalStorageService,
    private cdRef: ChangeDetectorRef) {

  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {


    //localStorage.setItem('flag', '1');
    this.storage.setItem('flag', '1').subscribe(flag => {
    });
    this.local.removeItem('id');
    this.local.removeItem('Email');
    this.local.removeItem('rol');
  }
  onSubmit(form: NgForm) {
    this.isPushed = false;
    this.isShow = true;
    this.isShowLogin = false;
    this.service.postUrl('Login/Login', form.value).then(
      (res: any) => {

        this.storage.setItem('id', res.id).subscribe(id => {
        });
        this.storage.setItem('rol', res.roles).subscribe(roles => {
        });

        this.storage.setItem('Email', res.email).subscribe(email => {
        });
        if (res.roles.length != 0) {
          if (res.roles[0].id == 1) {


            this.StatusLogin = false;
            this.father.StatusHeader = true;
            this.isPushed = true;
            this.isShow = false;
            this.isShowLogin = true;
            this.router.navigateByUrl('/landing');
          }
          else if (res.roles[0].id != 1) {

            this.father.StatusHeader = true;
            this.father.StatusSideBar = true;
            this.StatusLogin = false;
            this.isPushed = true;
            this.isShow = false;
            this.isShowLogin = true;
            this.router.navigateByUrl('/landing');
          }
        }
      }, error => {
        if (error.status == 0) {
          alert("problemas por parte del cliente o servidor")
        } else if (error.status == 400 || error.status != 200) {
          alert("contraseña y/o correo incorrecto")
        }

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
        if (error.status == 0) {
          alert("problemas por parte del cliente o servidor")
        } else if (error.status == 400 || error.status != 200) {
          alert("Este correo no se encuentra en nuestra Base De Datos")
        } else if (error.status == 200)
          alert("Se le ha enviado su nueva contraseña al correo")
        this.isShowPmodal = false;
      }
    );
  }

  openAddUserModal() {
    const modalRef = this.modalService.open(RegisterUserComponent, { centered: true });
    modalRef.componentInstance.isClient = true;
  }
}
