import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { RegisterUserComponent } from "../register-user/register-user.component";
import { User } from 'src/app/classes/user';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  @Output() public actionAlertEventEmitter = new EventEmitter();

  headerTitle = 'Usuarios';
  tableHeaders = ['Cédula', 'Nombre', 'Apellido', 'Email'];
  users: User[] = [];

  ngOnInit() {
    this.fetchEmployees();
  }

  private fetchEmployees() {
    this.apiService.getUrl<User[]>('users').then(users => {
      this.users = users;
    }).catch(error => {
      console.log(error);
    })
  }

  openAddUserModal(user?: User) {
    const modalRef = this.modalService.open(RegisterUserComponent);
    modalRef.componentInstance.user = user;
  }

  /**************************************************************************
    * Metodo para enviar la confirmación de la alerta                         *
    **************************************************************************/
  public messageAlert(event: Object) {
    this.actionAlertEventEmitter.emit(event);
  }

  public openModalActions(event, user: User) {
    event.preventDefault();
    let config: SweetAlertOptions = {
      title: `¿Desea eliminar a ${user.name} ${user.lastname} del sistema?`,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      type: 'question',
      focusCancel: true
    }
    Swal.fire(config).then(result => {
      this.messageAlert(user);
    })
  }
}
