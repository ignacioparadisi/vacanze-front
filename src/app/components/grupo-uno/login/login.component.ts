import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, ActivationStart, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../../../layout/layout.component';
import { GrupoUnoComponent } from '../grupo-uno.component';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild('Recovery') Recovery: ElementRef;
  isPushed = true;
  isShow = false;
  TodoForm: FormGroup;
  StatusLogin = true;
  formModel = {
    Email: '',
    Password: ''
  }
  constructor(private service: ApiService, private father: LayoutComponent, private router: Router, private landing: GrupoUnoComponent) {


  }

  ngOnInit() {

  }
  onSubmit(form: NgForm) {
    this.isPushed = false;
    this.isShow = true;
    this.service.postUrl('Login/Login', form.value).then(
      (res: any) => {
        localStorage.setItem('id', res.id);
        localStorage.setItem('rol', res.roles[0].name);
        localStorage.setItem('Email', res.email);
        if (res.roles[0].name == 1) {
          this.StatusLogin = false;
          this.father.StatusHeader = true;
          this.isPushed = true;
          this.isShow = false;
          this.router.navigateByUrl('/landing');
        } else if (res.roles[0].name != 1) {
          this.father.StatusHeader = true;
          this.father.StatusSideBar = true;
          this.StatusLogin = false;
          this.isPushed = true;
          this.isShow = false;
          this.router.navigateByUrl('/home');
        }
      }, error => {
        if (error.status == 400 || error.status != 200)
          alert("Ha ocurrido un error")
        this.isPushed = true;
        this.isShow = false;
      }
    );
  }
  RecoverySubmit(recoveryForm: NgForm) {

    this.service.postUrl('Email/Email', recoveryForm.value).then(
      (res: any) => {
        localStorage.setItem('Email', res.email);
        if (res.email) {
          this.StatusLogin = false;
          this.father.StatusHeader = true;
          this.father.StatusMain = false;
          alert("Se le ha enviado un correo con exito")
          this.router.navigateByUrl('/home');
        }
      },
      error => {
        if (error.status == 400 || error.status != 200) {
          alert("Ha ocurrido un error")
        } else if (error.status == 200)
          alert("Envio de nueva contraseña a su correo")
      }
    );
  }
}
