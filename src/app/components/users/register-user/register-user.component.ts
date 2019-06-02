import { Roles } from './../../../classes/roles';
import { ApiService } from "../../../services/api.service";
import { Component, OnInit, Input } from "@angular/core";
import { Role } from "../../../classes/role";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from '../../../classes/user';
import Swal from 'sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.scss"]
})
export class RegisterUserComponent implements OnInit {

  @Input() user: User;
  @Input() isClient: boolean;

  public state: string = 'none';
  public submitted: boolean = false;
  public formGroup: FormGroup;
  public roles: Role[] = [];

  constructor(
    private apiService: ApiService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.createFormGroup();
    this.fetchRoles();
    if (this.user) {
      this.fillFormGroup();
    }

  }

  get form() {
    return this.formGroup.controls;
  }

  private fetchRoles() {
    this.apiService.getUrl('roles').then(roles => {
      this.roles = roles.filter(role => role.id !== 1);
      this.addRolesToFormGroup();
      if (this.user) {
        this.fillFormGroupRoles();
      }
    }).catch(error => {
      if (error.status === 0) {
        this.showErrorAlert("No se pudo conecta al servidor para obtener los roles.")
      } else {
        this.showErrorAlert(error.error);
      }
    });
  }

  private createFormGroup() {
    this.formGroup = new FormGroup({
      // TODO: Validar que sean solo números
      documentId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });

    if (this.isClient) {
      this.formGroup.addControl('password',
        new FormControl(null, [Validators.required, Validators.minLength(8)]));
      this.formGroup.addControl('confirmPassword',
        new FormControl(null, [Validators.required, Validators.minLength(8)]))
    }
  }

  private addRolesToFormGroup() {
    if (this.roles.length > 0) {
      this.roles.forEach(role => {
        this.formGroup.addControl('role' + role.id, new FormControl(false));
      });
    }
  }

  private fillFormGroup() {
    this.formGroup.get('documentId').setValue(this.user.documentId);
    this.formGroup.get('name').setValue(this.user.name);
    this.formGroup.get('lastname').setValue(this.user.lastname);
    this.formGroup.get('email').setValue(this.user.email);
  }

  private fillFormGroupRoles() {
    const roles = this.user.roles;
    roles.forEach(role => {
      this.formGroup.get('role' + role.id).setValue(true);
    })
  }

  public onSubmit() {
    this.submitted = true;
    this.state = 'loading';
    console.log("OnSubmit");
    if (this.formGroup.invalid) {
      this.state = 'error';
      return;
    }

    const user: User = this.getUserFromForm();
    if (this.user) {
      this.updateUser(user, this.user.id);
    } else {
      this.createUser(user);
    }


  }

  public isRoleSelected(): boolean {
    this.roles.forEach(role => {
      const isSelected = this.formGroup.get('role' + role.id).value;
      if (isSelected === true) {
        return true;
      }
    });
    return false;
  }

  public checkboxValueChanged(roleId) {
    if (roleId === Roles.ADMIN) {
      this.roles.forEach(role => {
        if (role.id !== Roles.ADMIN) {
          this.formGroup.get('role' + role.id).setValue(false);
        }
      })
    } else {
      this.formGroup.get('role' + Roles.ADMIN).setValue(false);
    }
  }

  private getUserFromForm(): User {
    const id = 0;
    const documentId = parseInt(this.formGroup.get('documentId').value);
    const name = this.formGroup.get('name').value;
    const lastname = this.formGroup.get('lastname').value;
    const email = this.formGroup.get('email').value;
    var password = "";
    const roles: Role[] = []

    if (this.isClient) {
      password = this.formGroup.get('password').value;
      roles.push(new Role(Roles.CLIENT, 'Cliente'));
    } else {
      this.roles.forEach(role => {
        if (this.formGroup.get('role' + role.id).value) {
          roles.push(role);
        }
      });
    }


    const user = new User(id, documentId, name, lastname, email, password, roles);
    return user;
  }

  private createUser(user: User) {
    this.apiService.postUrl('users', user).then(user => {
      this.state = 'success';
      this.activeModal.close(true);
      this.showSuccessMessage('Usuario creado de manera exitosa');
    }).catch(error => {
      this.state = 'error';
      if (error.status == 0) {
        this.showErrorAlert("No se pudo conecta al servidor para crear al usuario.")
      } else {
        this.showErrorAlert(error.error);
      }
    });
  }

  private updateUser(user: User, id: number) {
    this.apiService.putUrl(`users/${id}`, user).then(user => {
      this.state = 'success';
      this.activeModal.close(true);
      this.showSuccessMessage('Usuario actualizado de manera exitosa');
    }).catch(error => {
      this.state = 'error';
      if (error.status == 0) {
        this.showErrorAlert("No se pudo conecta al servidor para actualizar al usuario.")
      } else {
        this.showErrorAlert(error.error);
      }
    });
  }

  private showSuccessMessage(title: string) {
    let config: SweetAlertOptions = {
      title: title,
      type: 'success',
      showConfirmButton: false,
      timer: 1800
    }
    Swal.fire(config);
  }

  private showErrorAlert(error: string) {
    let config: SweetAlertOptions = {
      title: error,
      type: 'error',
      showConfirmButton: false,
      timer: 1800
    }
    Swal.fire(config);
  }
}
