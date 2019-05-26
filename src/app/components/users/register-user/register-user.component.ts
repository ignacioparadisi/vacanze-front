import { Roles } from './../../../classes/roles';
import { ApiService } from "src/app/services/api.service";
import { Component, OnInit, Input } from "@angular/core";
import { Role } from "src/app/classes/role";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from 'src/app/classes/user';

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.scss"]
})
export class RegisterUserComponent implements OnInit {

  @Input() user: User;

  public submitted: boolean = false;
  public formGroup: FormGroup;
  public roles: Role[] = [];

  constructor(
    private apiService: ApiService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.createFormGroup()
    this.fetchRoles();
    if (this.user) {
      this.fillFormGroup();
    }

  }

  get form() {
    return this.formGroup.controls;
  }

  private fetchRoles() {
    this.apiService.getUrl<Role[]>('roles').then(roles => {
      this.roles = roles.filter(role => role.id !== 1);
      this.addRolesToFormGroup();
      if (this.user) {
        this.fillFormGroupRoles();
      }
    }).catch(error => {
      if (error.status === 0) {
        console.log('No se pudo conectar al servidor');
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
    console.log(this.formGroup.controls);
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }
  }

  public isRoleSelected(): boolean {
    this.roles.forEach(role => {
      if (this.formGroup.get('role' + role.id).value === true) {
        return true;
      }
    });
    return false;
  }

  public isRoleDisabled(roleId): boolean {
    if (this.formGroup.get('role' + Roles.ADMIN).value && roleId !== Roles.ADMIN) {
      return true;
    }
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
}
