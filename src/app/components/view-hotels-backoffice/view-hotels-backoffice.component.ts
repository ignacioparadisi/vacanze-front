import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../classes/role';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { environment as url } from '../../../environments/environment';
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";
import { HotelsService} from './services/hotels.service';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-view-hotels-backoffice',
  templateUrl: './view-hotels-backoffice.component.html',
  styleUrls: ['./view-hotels-backoffice.component.scss']
})


export class ViewHotelsBackofficeComponent implements OnInit {


  private tableHotelsHeader: Array<String>;
  private tableData: Array<Object>;
  private headerTitle: string;
  public isEditingHotel: boolean;
  public isCreatingHotel: boolean;


  constructor(
    private router: Router,
    private service: ApiService,
    private _hotelservice: HotelsService,
    private storage: LocalStorageService
  ) {
    this.headerTitle = _hotelservice.getHeaderTitle();
    this.tableHotelsHeader = _hotelservice.getHotelsHeaders();
  }


  getLocationIdEmiter(id: string){
    this.loadHotelsByLocation(parseInt(id));
  }

  getRole(){
    this.storage.getItem('rol').subscribe(data => {
      if (data[0].id == '2' || data[0].id == '5'){
      this.pantallaPrincipal(); }
      else{
      this.pantallaAcceso();
      }
    });
  }

  pantallaPrincipal(){
    var pagina;
    pagina = document.getElementById('principal');
    if(pagina!=null){
      pagina.style.display = "block";
    }
  }

  pantallaAcceso(){
    var pagina = document.getElementById('paginaAcceso');
    pagina.style.display = "block";
  }

  ngOnChanges(){
  }

  ngOnInit() {
    this.getRole();
    if(this.router.url === '/administrar-hoteles/agregar-hotel' || this.router.url.indexOf('editar-hotel') !== -1){
      this.isEditingHotel = true;
      this.isCreatingHotel = true;
    }
    else {
      this.isEditingHotel = false;
      this.isCreatingHotel= false;
    }
    this.loadHotels();
  }


  public getAlertAction(hotel: Object) {
    if(hotel['confirmed']){
      if(hotel['delete']){
        this.deleteHotel(hotel['id']);
      } else{
        this.changeHotelStatus(hotel);
      }
    }
  }


  public getCurrentRoute(route){
    if(route === '/agregar-hotel'){
      this.isEditingHotel = true;
      this.isCreatingHotel = false;
      this.router.navigate(['administrar-hoteles','agregar-hotel']);
    }
    else if (route.indexOf('/editar-hotel') !== -1){
      this.isCreatingHotel = true;
      this.isEditingHotel = false;
      this.router.navigate(['administrar-hoteles','editar-hotel', route.split('/')[2]]);
    }
    else{
      this.isCreatingHotel = false;
      this.isEditingHotel = false;
    }
  }



  public getDeactivatedComponent(component){
    this.loadHotels();
    this.getCurrentRoute('/administrar-hoteles');
  }



  public loadHotels(){
        this.service
        .getUrl(url.endpoint.default._get.getHotel)
        .then(response => {
              this.tableData = response
        }).catch( error => {
              this.alertStatus(500, false)
        });
  }


  public loadHotelsByLocation(id: number){
        this.service
        .getUrl(url.endpoint.default._get.getHotelByLocation, [id.toString()])
        .then(response => {
              this.tableData = response
        }).catch( error => {
              this.alertStatus(500, false)
        });
  }



  public deleteHotel(id: number){
        this.service
        .deleteUrl(url.endpoint.default._delete.deleteHotel, [id.toString()])
        .then(response =>{
              //TODO -> ENCONTRAR FORMA DE OBTENER EL STATUS HTTP
              this.alertStatus(200,true)
        }).catch( error => {
              this.alertStatus(500, false);
        });
  }



  public changeHotelStatus(hotel: any){
        hotel['isActive']=!hotel['isActive'];
        this.service
        .putUrl(url.endpoint.default._put.putHotel, hotel, [hotel.id.toString()])
        .then(response => {
              //TODO -> ENCONTRAR FORMA DE OBTENER EL STATUS HTTP
              this.alertStatus(200, false)
        }).catch( error => {
              this.alertStatus(500, false);
        });
  }


  private alertStatus(statusCode: number, deleted: boolean){
        let config: SweetAlertOptions = {
          title: (statusCode!=200 ? 'Se ha producido un error': (deleted ? 'Hotel eliminado': 'Se cambió el estatus del hotel')),
          type:  (statusCode==200 ? 'success' : 'error'),
          showConfirmButton: true
        }
        Swal.fire(config).then( result =>{
          this.loadHotels();
        });
  }


  public getHotels(){
    return this.tableData;
  }

  public getHeaderHotels(){
    return this.tableHotelsHeader;
  }

  public getHeaderTitle(){
    return this.headerTitle;
  }

}
