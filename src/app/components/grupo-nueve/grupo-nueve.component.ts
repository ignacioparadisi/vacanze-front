import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService} from '../../services/api.service';
import { Claim } from "../../classes/claim";
import { Baggage } from "../../classes/baggage";
import { environment as url} from '../../../environments/environment';
import Swal from 'sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-grupo-nueve',
  templateUrl: './grupo-nueve.component.html',
  styleUrls: ['./grupo-nueve.component.scss']
})
export class GrupoNueveComponent implements OnInit {

  //Variables de Interfaz
  public formGroup: FormGroup;
  public formSearch: FormGroup;
  public closeResult: string;

  //Variables para llenar (Claim)
  public claims : Claim[] = [];
  public claimsAbiertos : Claim[] = [];
  public claimsCerrados : Claim[] = [];

  //Variables para llenar (Baggage)
  public baggages : Baggage[] = []
  public BaggageExtraviados : Baggage[] = [];
  public BaggageEntregados : Baggage[] = [];
  public BaggageEncontrados : Baggage[] = [];

  //Elementos del put
  public idPut : any;
  public titlePut : any;
  public descrPut : any;

  constructor(private modalService: NgbModal,
     private service: ApiService)
  {}

  ngOnInit() {

    this.getClaim()

    this.formGroup = new FormGroup({
      serial: new FormControl(null, [Validators.required]),
      titulo: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required])
    })    

    this.formSearch = new FormGroup({
      id: new FormControl(null, [Validators.required])
    })
  }

  open(content, id : any, title : any, descr : any) {
      this.idPut = id;
      this.titlePut = title;
      this.descrPut = descr;
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  getClaim(){
    this.service.getUrl(url.endpoint.default._get.getClaim,['0'])
    .then(data =>{this.claims=data; console.log(data)})
    .catch(data =>{console.log(data)});
  }

  getAdminClaimStatusAbierto(){
    this.service.getUrl(url.endpoint.default._get.getClaimAdminStatus,['ABIERTO'])
    .then(data => {this.claimsAbiertos = data;                                                                                             
      console.log(data)})
    .catch(data =>{console.log(data)});
  }

  getAdminClaimStatusCerrado(){
    this.service.getUrl(url.endpoint.default._get.getClaimAdminStatus,['CERRADO'])
    .then(data => {this.claimsCerrados = data;                                                                                             
      console.log(data)})
    .catch(data =>{console.log(data)});
  }

  getClientBaggageSerial(id : string){    
    this.service.getUrl(url.endpoint.default._get.getBaggageClientSerial, [id])
    .then(data => {this.baggages = data; console.log(data)})
  }

  getClientBaggageDocument(id : string){    
    this.service.getUrl(url.endpoint.default._get.getBaggageClientDocument, [id])
    .then(data => {this.baggages = data; console.log(data)})
  }

  getAdminBaggageStatusExtraviado(){
    this.service.getUrl(url.endpoint.default._get.getBaggageAdminStatus,['EXTRAVIADO'])
    .then(data => {this.BaggageExtraviados = data;                                                                                             
      console.log(data)})
    .catch(data =>{console.log(data)});
  }

  getAdminBaggageStatusEntregado(){
    this.service.getUrl(url.endpoint.default._get.getBaggageAdminStatus,['ENTREGADO'])
    .then(data => {this.BaggageEntregados = data;                                                                                             
      console.log(data)})
    .catch(data =>{console.log(data)});
  }

  getAdminBaggageStatusEncontrado(){
    this.service.getUrl(url.endpoint.default._get.getBaggageAdminStatus,['ENCONTRADO'])
    .then(data => {this.BaggageEncontrados = data;                                                                                             
      console.log(data)})
    .catch(data =>{console.log(data)});
  }
  
  postClaim(){  
    this.service
    .postUrl(url.endpoint.default._post.postClaim
             ,{title: this.formGroup.get('titulo').value,
               description: this.formGroup.get('descripcion').value}
             ,[this.formGroup.get('serial').value])
    .then(response => {console.log(response); 
                       this.claimCreatedSuccessfully(); 
                       this.getClaim()})
    .catch(data =>{console.log(data)});
  }

  private claimCreatedSuccessfully() {
    let config: SweetAlertOptions = {
      title: 'Claim has been created successfully',
      type: 'success',
      showConfirmButton: true,
      timer: 2500
    }
    Swal.fire(config);
  }

  deleteClaim(id : any){
    this.service.deleteUrl(url.endpoint.default._delete.deleteClaim, [id])
    .then(response => {console.log(response);
                       this.getClaim();
                       this.claimDeleteSuccessfully()})
    .catch(data =>{console.log(data)});
  }

  private claimDeleteSuccessfully() {
    let config: SweetAlertOptions = {
      title: 'Claim has been deleted successfully',
      type: 'success',
      showConfirmButton: true,
      timer: 2500
    }
    Swal.fire(config);
  }

  putClaim(id : any){
    if(this.titlePut != null && this.descrPut != null && this.getCk_cambiar()){
      this.putAll(id);
    }
    else
    if(this.titlePut != null || this.descrPut != null){
      this.putClaimTD(id);
    }else 
    if(this.getCk_cambiar()){
      this.putClaimStatus(id);
    }
  }

  getCk_cambiar(){
    var ck_cambiar =<HTMLInputElement> document.getElementById("check_cambiar");
    if(ck_cambiar.checked){
      return true;
    }
    else{
      return false;
    }
  }

  putAll(id : any){
    this.service.putUrl(url.endpoint.default._put.putClaimStatus,
                        {title: this.titlePut,
                         description: this.descrPut},[id])
                         .then(
                         response => {console.log(response); 
                         this.putClaimStatus(id)})
                         .catch(data =>{console.log(data)});
  }

  putClaimTD(id : any){
    this.service.putUrl(url.endpoint.default._put.putClaimStatus,
                        {title: this.titlePut,
                         description: this.descrPut},[id])
                        .then(
                        response => {console.log(response); 
                        this.getClaim();
                        this.claimUpdateSuccessfully()})
                        .catch(data =>{console.log(data.error); 
                                       this.claimUpdateFailed(data.error)});
  }

  putClaimStatus(id: any){
    this.service.putUrl(url.endpoint.default._put.putClaimStatus,{status: 'CERRADO'},[id])
    .then(
      response => {console.log(response); 
                   this.getClaim();
                   this.claimUpdateSuccessfully()})
    .catch(data =>{console.log(data)});
  }

  private claimUpdateSuccessfully() {
    let config: SweetAlertOptions = {
      title: 'Claim has been updated successfully',
      type: 'success',
      showConfirmButton: true,
      timer: 2500
    }
    Swal.fire(config);
  }

  private claimUpdateFailed(error : string) {
    let config: SweetAlertOptions = {
      title: error,
      type: 'error',
      showConfirmButton: true,
      timer: 2500
    }
    Swal.fire(config);
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

  listadoEquipaje(){
    var pagina = document.getElementById('equipajeLista');
    var ck_documento =<HTMLInputElement> document.getElementById("check_documento");
    var ck_serial =<HTMLInputElement> document.getElementById("check_serial");
    
    var isCheckedDocumento = ck_documento.checked;
    var isCheckedSerial = ck_serial.checked;

    if(isCheckedDocumento){
    this.getClientBaggageDocument(this.formSearch.get('id').value);
    pagina.style.display = 'block';
    }else
    if(isCheckedSerial){
    this.getClientBaggageSerial(this.formSearch.get('id').value);
    pagina.style.display = 'block';
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
      this.getAdminBaggageStatusExtraviado();
      primeraopcion.style.display = "block";
      segundaopcion.style.display = "none";
      terceraopcion.style.display = "none";
    }else
    if(isCheckedEntrega){
      this.getAdminBaggageStatusEntregado();
      segundaopcion.style.display = "block";
      primeraopcion.style.display = "none";
      terceraopcion.style.display = "none";
    }else
    if(isCheckedEncont){
      this.getAdminBaggageStatusEncontrado();
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

  BusqEquipajeClaim(){
    var ck_abierto =<HTMLInputElement> document.getElementById("check_abierto");
    var ck_cerrado =<HTMLInputElement> document.getElementById("check_cerrado");

    var isCheckedOpen = ck_abierto.checked;
    var isCheckedClose = ck_cerrado.checked;

    var primeraopcion= document.getElementById("abiertos");
    var segundaopcion= document.getElementById("cerrados");

    if (isCheckedOpen) {
        this.getAdminClaimStatusAbierto();
        primeraopcion.style.display = "block";
        segundaopcion.style.display = "none";
    }else
    if(isCheckedClose){
       this.getAdminClaimStatusCerrado();
      segundaopcion.style.display = "block";
      primeraopcion.style.display = "none";
    }
  }

}
