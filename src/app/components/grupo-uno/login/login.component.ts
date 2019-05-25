import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { RegisterUserComponent } from '../../users/register-user/register-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'
  ]
})
export class LoginComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterUserComponent);
    modalRef.componentInstance.isClient = true;
  }
}
