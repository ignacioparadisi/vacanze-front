import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService} from 'src/app/services/api.service';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as url} from '../../../environments/environment'

@Component({
  selector: 'app-grupo-nueve',
  templateUrl: './grupo-nueve.component.html',
  styleUrls: ['./grupo-nueve.component.scss']
})
export class GrupoNueveComponent implements OnInit {

  public form: FormGroup;
  closeResult: string;
  
  public reclamo = [
    {titulo: 'Mr. Nice', descripcion: 'aaaa', status:'ABIERTO' }
  ];

  constructor(private modalService: NgbModal,
     public http: HttpClient, 
     private service: ApiService)
  {}

  ngOnInit() {
    
    //this.service.deleteReclamo({rec_titulo:'titulo', rec_descr:'elias y jorge', rec_status:'ABIERTO'});
    
    this.service.getUrl(url.endpoint.default._get.getReclamo).then(data =>{console.log(data)})

    this.form = new FormGroup({
        nacionalidad: new FormControl(-1, [Validators.required]),
        pasaporte: new FormControl(null, [Validators.required]),
        cedula: new FormControl(null, [Validators.required])
      })
  }

  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  postReclamo(){
    this.service
    .postUrl(url.endpoint.default._post.postReclamo,{titulo:'elias', descripcion:'ejdhs',status:'ABIERTO'}, ['1'])
    .then(response => {console.log(response)});
  }

  pantallaAdmin(){
    var pagina, liCliente, liAdmin;
    pagina = document.getElementById('paginaAdmin');
    liCliente = document.getElementById('li-cliente');
    liAdmin = document.getElementById('li-admin');

    pagina.style.display = "block";
    liCliente.style.display = "none";
    liAdmin.style.display = "none";
  }

  pantallaCliente(){
    var pagina, liCliente, liAdmin;
    pagina = document.getElementById('paginaCliente');
    liCliente = document.getElementById('li-cliente');
    liAdmin = document.getElementById('li-admin');

    pagina.style.display = "block";
    liCliente.style.display = "none";
    liAdmin.style.display = "none";
  }

  listadoEquipaje(){
    var pagina;

    pagina = document.getElementById('equipajeLista');

    if(pagina.style.display == 'none'){
    pagina.style.display = 'block';
    }
    else{
    pagina.style.display = 'none';
    }
  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }

  checkeadoDocumento(event: any){

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
  }

  checkeadoSerial(event: any){

    var ck_documento =<HTMLInputElement> document.getElementById("check_documento");
    var ck_serial =<HTMLInputElement> document.getElementById("check_serial");

    var isCheckedDocumento = ck_documento.checked;
    var isCheckedSerial = ck_serial.checked;
    var primeraopcion= document.getElementById("documento");
    var segundaopcion= document.getElementById("serial");
    
    if (isCheckedSerial) {
      segundaopcion.style.display = 'flex';
      
       if(isCheckedDocumento){
        primeraopcion.style.display = 'none';
        ck_documento.click()
       }
    }
    else{
      segundaopcion.style.display = 'none';
    }
  }

  checkeadoEncontrado(event: any){

    var ck_extraviado =<HTMLInputElement> document.getElementById("check_extraviado");
    var ck_entregado =<HTMLInputElement> document.getElementById("check_entregado");
    var ck_encontrado =<HTMLInputElement> document.getElementById("check_encontrado");

    var isCheckedExtrav = ck_extraviado.checked;
    var isCheckedEntrega = ck_entregado.checked;
    var isCheckedEncont = ck_encontrado.checked;

    if (isCheckedEncont) {
      if(isCheckedExtrav && isCheckedEntrega){
       ck_extraviado.click()
       ck_entregado.click()
      }
      else if(isCheckedExtrav){
       ck_extraviado.click()
      }
      else if(isCheckedEntrega){
        ck_entregado.click()
      }
    }
  }

  checkeadoExtraviado(event: any){
    var ck_extraviado =<HTMLInputElement> document.getElementById("check_extraviado");
    var ck_entregado =<HTMLInputElement> document.getElementById("check_entregado");
    var ck_encontrado =<HTMLInputElement> document.getElementById("check_encontrado");

    var isCheckedExtrav = ck_extraviado.checked;
    var isCheckedEntrega = ck_entregado.checked;
    var isCheckedEncont = ck_encontrado.checked;
    
    if (isCheckedExtrav) {
       if(isCheckedEntrega && isCheckedEncont){
        ck_entregado.click()
        ck_encontrado.click()
       }
       else if(isCheckedEntrega){
        ck_entregado.click()
       }
       else if(isCheckedEncont){
        ck_encontrado.click()
       }
    }
  }

  checkeadoEntregado(event: any){
    var ck_extraviado =<HTMLInputElement> document.getElementById("check_extraviado");
    var ck_entregado =<HTMLInputElement> document.getElementById("check_entregado");
    var ck_encontrado =<HTMLInputElement> document.getElementById("check_encontrado");

    var isCheckedExtrav = ck_extraviado.checked;
    var isCheckedEntrega = ck_entregado.checked;
    var isCheckedEncont = ck_encontrado.checked;

    if (isCheckedEntrega) {
      if(isCheckedExtrav && isCheckedEncont){
       ck_extraviado.click()
       ck_encontrado.click()
      }
      else if(isCheckedExtrav){
       ck_extraviado.click()
      }
      else if(isCheckedEncont){
       ck_encontrado.click()
      }
    }
  }

  BusqEquipajeAdmin(){
    var ck_extraviado =<HTMLInputElement> document.getElementById("check_extraviado");
    var ck_entregado =<HTMLInputElement> document.getElementById("check_entregado");
    var ck_encontrado =<HTMLInputElement> document.getElementById("check_encontrado");

    var isCheckedExtrav = ck_extraviado.checked;
    var isCheckedEntrega = ck_entregado.checked;
    var isCheckedEncont = ck_encontrado.checked;

    var primeraopcion= document.getElementById("extraviados");
    var segundaopcion= document.getElementById("entregados");
    var terceraopcion= document.getElementById("encontrados");

    if (isCheckedExtrav) {
      primeraopcion.style.display = "block";
      segundaopcion.style.display = "none";
      terceraopcion.style.display = "none";
    }else
    if(isCheckedEntrega){
      segundaopcion.style.display = "block";
      primeraopcion.style.display = "none";
      terceraopcion.style.display = "none";
    }else
    if(isCheckedEncont){
      terceraopcion.style.display = "block";
      primeraopcion.style.display = "none";
      segundaopcion.style.display = "none";
    }
  }

  checkeadoAbierto(event: any){
    var ck_abierto =<HTMLInputElement> document.getElementById("check_abierto");
    var ck_cerrado =<HTMLInputElement> document.getElementById("check_cerrado");

    var isCheckedOpen = ck_abierto.checked;
    var isCheckedClose = ck_cerrado.checked;

    if (isCheckedOpen) {
      if(isCheckedClose){
        ck_cerrado.click()
      }
    }
  }

  checkeadoCerrado(event: any){
    var ck_abierto =<HTMLInputElement> document.getElementById("check_abierto");
    var ck_cerrado =<HTMLInputElement> document.getElementById("check_cerrado");

    var isCheckedOpen = ck_abierto.checked;
    var isCheckedClose = ck_cerrado.checked;

    if (isCheckedClose) {
      if(isCheckedOpen){
        ck_abierto.click()
      }
    }
  }

  BusqEquipajeReclamo(){
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
  }

  
  

}
