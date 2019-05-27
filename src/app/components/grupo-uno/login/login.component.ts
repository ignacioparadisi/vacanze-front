import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivationStart, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from 'src/app/layout/layout.component';




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
  StatusLogin=true;
  formModel={
    Email:'',
    Password:''
  }
  //private service: ApiService; private router: Router; private toastr: ToastrService;private father: LayoutComponent;
  
  
  constructor(private service: ApiService,private father: LayoutComponent) { 
    

  }
 
  ngOnInit() {
    
  }
  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        if(res.role=="Cliente"){
         this.father.StatusHeader=true; 
          this.StatusLogin=false;
          
        }else if(res.role=="Admin"){
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
