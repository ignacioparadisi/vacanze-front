import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/classes/role';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public form: FormGroup;
  public roles: Role[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.fetchRoles();

    this.form= new FormGroup({
      role: new FormControl(-1, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  private fetchRoles(): Role[] {
    this.roles = [
      new Role(0, 'Cliente'),
      new Role(1, 'Administrador'),
      new Role(2, 'Checkin'),
      new Role(3, 'Reclamo'),
      new Role(4, 'Cargador')
    ];
    return this.roles;
  }

}
