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
    this.fetchRoles();
    this.createFormGroup();
    if (this.user) {
      this.fillFormGroup();
    }

  }

  get form() {
    return this.formGroup.controls;
  }

  private fetchRoles(): Role[] {
    this.roles = [
      new Role(0, "Cliente"),
      new Role(1, "Administrador"),
      new Role(2, "Checkin"),
      new Role(3, "Reclamo"),
      new Role(4, "Cargador")
    ];
    return this.roles;
  }

  private createFormGroup() {
    this.formGroup = new FormGroup({
      role: new FormControl(-1, [Validators.required, Validators.min(0)]),
      // TODO: Validar que sean solo números
      documentId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      // TODO: Validar el formato que debe tener la contraseña
      // password: new FormControl(null, [
      //   Validators.required,
      //   Validators.minLength(8)
      // ]),
      // confirmPassword: new FormControl(null, [Validators.required])
    });
  }

  private fillFormGroup() {
    this.formGroup.get('role').setValue(this.user.role);
    this.formGroup.get('documentId').setValue(this.user.documentId);
    this.formGroup.get('name').setValue(this.user.name);
    this.formGroup.get('lastname').setValue(this.user.lastname);
    this.formGroup.get('email').setValue(this.user.email);
  }

  public onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }
  }
}
