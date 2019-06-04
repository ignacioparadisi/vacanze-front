import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { Baggage } from "../../../classes/baggage";
import { environment as url } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  public formGroup: FormGroup;
  public closeResult: string;
  public baggage: Baggage[] = [];

  //Elementos del put
  public idPut: any;
  public pasaportePut: any;
  public descrPut: any;
  id: string;
  passport: string;
  descripcion: string;
  estatus: string;
  pagina: any;

  constructor(private modalService: NgbModal,
    private service: ApiService) { }

  ngOnInit() {
    this.pagina = document.getElementById('paginaCliente');
    this.service.getUrl(url.endpoint.default._get.getBaggage, ['0']).then(data => { this.baggage = data; })

    this.formGroup = new FormGroup({
      pasaporte: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required])
    });
  }

  open(content, id: any, pasaporte: any, descr: any) {
    this.idPut = id;
    this.pasaportePut = pasaporte;
    this.descrPut = descr;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openChIn(content, id: any, pasaporte: any, descr: any) {
    this.idPut = id;
    this.pasaportePut = pasaporte;
    this.descrPut = descr;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getBaggage() {
    this.service.getUrl(url.endpoint.default._get.getBaggage, ['0']).then(data => { this.baggage = data; console.log(data) });
  }

  postBaggege() {
    let descripcion = this.formGroup.get('descripcion');

    this.service.getUrl(url.endpoint.default._get.addbaggage, ['ACTIVO', descripcion.value.toString()]).then(Response => {

      var id = JSON.stringify(Response);
      this.service.getUrl(url.endpoint.default._get.getBaggage, [id.toString()]).then(Response => {

        this.id = Response.id;
        this.passport = this.formGroup.get('pasaporte').value;
        this.descripcion = Response.descripcion;
        this.estatus = Response.status;
        this.ngOnInit();
      }).catch(error => {
        console.log('error interno :: ', error);
      });
    }).catch(error => {
      console.log('eroorr :: ', error);
    });

  }

  private baggageCreatedSuccessfully() {
    let config: SweetAlertOptions = {
      title: 'Se ha registrado exitosamente',
      type: 'success',
      showConfirmButton: true,
      timer: 2500
    }
    Swal.fire(config);
  }

  deleteBaggage(id: any) {
    this.service.deleteUrl(url.endpoint.default._delete.deleteBaggage, [id])
      .then(response => {
        this.getBaggage();
        this.baggageDeleteSuccessfully()
      });
  }

  private baggageDeleteSuccessfully() {
    let config: SweetAlertOptions = {
      title: 'Se ha eliminado exitosamente',
      type: 'success',
      showConfirmButton: true,
      timer: 2500
    }
    Swal.fire(config);
  }

  putEquipaje(id: any) {
    if (this.pasaportePut != null && this.descrPut != null && this.getCk_cambiar()) {
      this.putAll(id);
    }
    else
      if (this.pasaportePut != null || this.descrPut != null) {
        this.putEquipajeTD(id);
      } else
        if (this.getCk_cambiar()) {
          this.putEquipajeStatus(id);
        }
  }

  getCk_cambiar() {
    var ck_cambiar = <HTMLInputElement>document.getElementById("check_cambiar");
    if (ck_cambiar.checked) {
      return true;
    }
    else {
      return false;
    }
  }

  putAll(id: any) {
    this.service.putUrl(url.endpoint.default._put.putEquipajeStatus,
      {
        pasaporte: this.pasaportePut,
        description: this.descrPut
      }, [id]).then(
        response => {
          this.putEquipajeStatus(id)
        });
  }

  putEquipajeTD(id: any) {
    this.service.putUrl(url.endpoint.default._put.putEquipajeStatus,
      {
        pasaporte: this.pasaportePut,
        description: this.descrPut
      }, [id]).then(
        response => {
          this.getBaggage();
          this.baggageUpdateSuccessfully()
        });
  }

  putEquipajeStatus(id: any) {
    this.service.putUrl(url.endpoint.default._put.putEquipajeStatus, { status: 'CERRADO' }, [id]).then(
      response => {
        this.getBaggage();
        this.baggageUpdateSuccessfully()
      });
  }

  private baggageUpdateSuccessfully() {
    let config: SweetAlertOptions = {
      title: 'Se ha actualizado exitosamente',
      type: 'success',
      showConfirmButton: true,
      timer: 2500
    }
    Swal.fire(config);
  }

  /* pantallaAdmin(){
    var pagina, liCliente, liAdmin;
    pagina = document.getElementById('paginaAdmin');
    liCliente = document.getElementById('li-cliente');
    liAdmin = document.getElementById('li-admin');

    pagina.style.display = "block";
    liCliente.style.display = "none";
    liAdmin.style.display = "none";
  } */

  /*   pantallaCliente(){
      var pagina, liCliente, liAdmin;
      pagina = document.getElementById('paginaCliente');
      liCliente = document.getElementById('li-cliente');
      liAdmin = document.getElementById('li-admin');
  
      pagina.style.display = "block";
      liCliente.style.display = "none";
      liAdmin.style.display = "none";
    } */

  listadoEquipaje() {
    var pagina;
    pagina = document.getElementById('equipajeLista');


    if (pagina.style.display == 'none') {
      pagina.style.display = 'block';
    }
    else {
      pagina.style.display = 'none';
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /*   checkeadoDocumento(event: any){
  
      var ck_documento =<HTMLInputElement> document.getElementById("check_documento");
      var ck_serial =<HTMLInputElement> document.getElementById("check_serial");
  
      var isCheckedDocumento = ck_documento.checked;
      var isCheckedSerial = ck_serial.checked;
      var primeraopcion= document.getElementById("documento");
      var segundaopcion= document.getElementById("serial");
      
      if (isCheckedDocumento) {
         primeraopcion.style.display = 'flex';
        
         if(isCheckedSerial){
          segundaopcion.style.display = 'none';
          ck_serial.click()
         }
      }
      else{
        primeraopcion.style.display = 'none';
      }
    } */


  /*   BusqEquipajeClaim(){
      var ck_abierto =<HTMLInputElement> document.getElementById("check_abierto");
      var ck_cerrado =<HTMLInputElement> document.getElementById("check_cerrado");
  
      var isCheckedOpen = ck_abierto.checked;
      var isCheckedClose = ck_cerrado.checked;
  
      var primeraopcion= document.getElementById("abiertos");
      var segundaopcion= document.getElementById("cerrados");
  
      if (isCheckedOpen) {
          primeraopcion.style.display = "block";
          segundaopcion.style.display = "none";
      }else
      if(isCheckedClose){
        segundaopcion.style.display = "block";
        primeraopcion.style.display = "none";
      }
    } */




}
