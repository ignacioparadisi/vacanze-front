import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from 'src/app/layout/layout.component';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  StatusLogin=true;
  formModel={
    Email:'',
    Password:''
  }
  constructor(private service: ApiService, private router: Router, private toastr: ToastrService,private father: LayoutComponent) { }

  ngOnInit() {
  }
  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        if(res.role=="Cliente"){
          this.router.navigateByUrl('../../layout/home');
          this.father.StatusHeader=true; 
          this.StatusLogin=false;
        }else if(res.role=="Admin"){
          this.router.navigateByUrl('../../layout/home');
          this.father.StatusHeader=true; 
          this.father.StatusSideBar=true;
          this.StatusLogin=false;
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
