import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel={
    Email:'',
    Password:''
  }
  constructor(private service: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }
  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        if(res.role=="Cliente"){
          this.router.navigateByUrl('/landing-page');
        }
        
      },
      err=>{
        if(err.status==400)
          this.toastr.error('data incorrect','Autentication Failed');
          else
          console.log(err);
        }
    );
  }

}
