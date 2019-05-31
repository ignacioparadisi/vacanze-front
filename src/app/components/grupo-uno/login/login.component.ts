import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, ActivationStart, RouterOutlet } from '@angular/router';

import { LayoutComponent } from '../../../layout/layout.component';
import { GrupoUnoComponent } from '../grupo-uno.component';
import { Grupo1Service } from '../../../services/grupo1/grupo1.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/*public interface ILoginComponent {
  service? :ApiService;
   router? :Router; 
    toastr? :ToastrService;
    father? :LayoutComponent;
}*/


export class LoginComponent implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild('Recovery') Recovery: ElementRef;
  TodoForm: FormGroup;
  StatusLogin = true;
  formModel = {
    Email: '',
    Password: ''
  }
  //private service: ApiService; private router: Router; private toastr: ToastrService;private father: LayoutComponent;


  constructor(private service: Grupo1Service, private father: LayoutComponent, private router: Router, private landing: GrupoUnoComponent) {


  }

  ngOnInit() {

  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('id', res.id);
        localStorage.setItem('rol', res.roles[0].name);
        localStorage.setItem('Email', res.email);


        if (res.roles[0].name == 1) {

          this.StatusLogin = false;
          this.father.StatusHeader = true;
          //this.father.StatusMain = false;

          this.router.navigateByUrl('/landing');

        } else if (res.roles[0].name != 1) {
          this.father.StatusHeader = true;
          this.father.StatusSideBar = true;
          this.StatusLogin = false;
          this.router.navigateByUrl('/home');
        }

      },
      err => {
        if (err.status == 400 || err.status != 200)
          alert("Ha ocurrido un error")
      }
    );
  }

  RecoverySubmit(recoveryForm: NgForm) {

    //alert("this is the recovery" + recoveryForm.value)
    this.service.sendEmail(recoveryForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('Email', res.email);
        if (res.email) {

          this.StatusLogin = false;
          this.father.StatusHeader = true;
          this.father.StatusMain = false;
          alert("Se le ha enviado un correo con exito")
          this.router.navigateByUrl('/home');

        } /*else if (res.role == "Admin") {
          this.father.StatusHeader = true;
          this.father.StatusSideBar = true;
          this.StatusLogin = false;
          this.router.navigateByUrl('/home');
        }*/

      },
      err => {
        if (err.status == 400 || err.status != 200) {
          alert("Ha ocurrido un error")
        } else if (err.status == 200)
          alert("Envio de nueva contraseña a su correo")
      }
    );

  }
}
