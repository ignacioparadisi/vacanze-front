import { ApiService } from '../../../services/api.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { RegisterUserComponent } from "../register-user/register-user.component";
import { User } from '../../../classes/user';
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
    this.apiService.getUrl('users').then(users => {
      this.users = users;
    }).catch(error => {
      if (error.status == 0) {
        this.showErrorAlert("No se pudo conecta al servidor para obtener los usuarios.")
      } else {
        this.showErrorAlert(error.error);
      }
    })
  }

  openAddUserModal(user?: User) {
    const modalRef = this.modalService.open(RegisterUserComponent, { centered: true });
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.isClient = false;
    modalRef.result.then(success => {
      if (success) {
        this.fetchEmployees();
      }
    })
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
    Swal.fire(config).then(shouldDelete => {
      if (shouldDelete.value === true) {
        this.apiService.deleteUrl(`users/${user.id}`).then(id => {
          if (id > 0) {
            this.showSuccessAlert(`${user.name} ${user.lastname} ha sido eliminado de manera exitosa.`);
            this.fetchEmployees();
          }
        }).catch(error => {
          if (error.status == 0) {
            this.showErrorAlert("No se pudo conecta al servidor para eliminar al usuario.")
          } else {
            this.showErrorAlert(error.error);
          }
        })
      }
    });
  }

  private showSuccessAlert(title: string) {
    let config: SweetAlertOptions = {
      title,
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
    };
    Swal.fire(config);
  }
}
