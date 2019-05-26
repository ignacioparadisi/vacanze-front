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
    this.apiService.getUrl<Role[]>('roles').then(roles => {
      this.roles = roles;
    }).catch(error => {
      if (error.status === 0) {
        console.log('No se pudo conectar al servidor');
      }
    })
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
    });
  }

  private fillFormGroup() {
    this.formGroup.get('role').setValue(this.user.roles[0]);
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
