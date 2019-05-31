import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../classes/role';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { Restaurant } from '../../interfaces/restaurant';
import { environment as url } from '../../../environments/environment';
// tabla responsive reutilizable
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";


@Component({
  selector: 'app-grupo-siete-restaurantes',
  templateUrl: './grupo-siete-restaurantes.component.html',
  styleUrls: ['./grupo-siete-restaurantes.component.scss']
})

export class GrupoSieteRestaurantesComponent implements OnInit {

  private tableRestaurantsHeader: Array<String>;
  private tableData: Array<Object>;
  private headerTitle: string;
  private restaurants: Array<Restaurant>;

  // para saber en que ruta se encuentra
  public isEditingRestaurant: boolean;
  public isCreatingRestaurant: boolean;

  ngOnInit() {
  }

  constructor(private router: Router, private service: ApiService) {
    this.headerTitle = 'Lista de Restaurantes';
    this.tableRestaurantsHeader = ['#', 'Nombre', 'Capacidad',
                                   'Calificación', 'Especialidad',
                                   'Precio', 'Razon Social', 'Descripcion',
                                   'Telefono', 'Direccion', 'Status'];
    this.loadRestaurants();
  }

  public getAlertAction(action: string) {
    console.log(action['delete']);
    if (action['delete']) {
      // console.log(action);
      this.deleteRestaurant(action['id']);
    } else {
      console.log('se quiere actualizar el estatus del restaurantes ', action);
      this.changeRestaurantStatus(action);
    }
  }


  public getCurrentRoute(route){
    if (route === '/agregar-restaurant') {
      this.isEditingRestaurant = true;
      this.isCreatingRestaurant = false;
      this.router.navigate(['administrar-restaurantes', 'agregar-restaurant']);
    } else if (route === '/editar-restaurant') {
      this.isCreatingRestaurant = true;
      this.isEditingRestaurant = false;
      this.router.navigate(['administrar-restaurantes', 'editar-restaurant']);
    } else {
      this.isCreatingRestaurant = false;
      this.isEditingRestaurant = false;
    }
  }

  public getDeactivatedComponent(component){
    this.loadRestaurants();
    this.getCurrentRoute('/administrar-restaurantes');
  }

  public loadRestaurants() {
        this.service
        .getUrl(url.endpoint.default._get.getRestaurant)
        .then(response => {
              // console.log("Cargan los restaurantes", response),
              this.tableData = response
        }).catch( error => {
              console.log('Error carga inicial de restaurantes', error);
        });
  }

  public deleteRestaurant(id: number) {
        console.log('se esta borrando el restaurante ', id);
        this.service
        .deleteUrl(url.endpoint.default._delete.deleteRestaurant, [id.toString()])
        .then(response => {
              // console.log("Respuesta al borrar restaurant",response.status),
              // no hay excepcion pero el status no es 200
              this.deleteRestaurantById(response[id.toString()]);
              this.alertStatus(response.status, true);
        }).catch( error => {
              console.log('Error en el delete del restaurante', error);
        });
  }

  /* public getDeleteAlert(data){
    // Si marco confirmar en la moda, quiero borrar el crucero
    if(data['confirmed']){
      console.log('se ejecuto');
      this.service.deleteUrl(url.endpoint.default._delete.cruisers.deleteRestaurant, [data['id']])
        .then(response => {
          this.deleteRestaurantById(response['id']);
        })
        .catch(error => {
        })
    }
  } */

  public changeRestaurantStatus(restaurant: any) {
        this.service
        .putUrl(url.endpoint.default._put.putRestaurant, restaurant, [restaurant.id.toString()])
        .then(response => {
              console.log('Exito al modificar ', restaurant.id),
              this.alertStatus(response.status, false)
        }).catch( error => {
              console.log('Error actualizando el estatus del restaurante')
        });
  }

  private alertStatus(statusCode: number, deleted: boolean) {
        let config: SweetAlertOptions = {
          // tslint:disable-next-line:max-line-length
          title: (statusCode !== 200 ? 'Se ha producido un error' : (deleted ? 'Restaurante eliminado' : 'Se cambió el estatus del restaurante')),
          type:  (statusCode === 200 ? 'success' : 'error'),
          showConfirmButton: true
        }
        Swal.fire(config).then( result => {
          this.loadRestaurants();
        });
  }


  public getRestaurants() {
    return this.tableData;
  }

  public getHeaderRestaurants() {
    return this.tableRestaurantsHeader;
  }

  public getHeaderTitle() {
    return this.headerTitle;
  }

  /*********************************************
  * Metodo para setear la variable de cruceros *
  **********************************************/
 public setRestaurants(restaurants: Array<Object>){
  this.tableData = restaurants;
}

/************************************************
* Metodo para retornar la variable de cruceros  *
*************************************************/
public getVariableRestaurants(): Array<Object>{
  return this.tableData;
}

  /***************************************************************
  * Metodo que se ejecuta para actualizar el arreglo de cruceros *
  * debido a la elminacion del crucero por el id                 *
  ****************************************************************/

 public deleteRestaurantById(id: number){
  let restaurants = this.getVariableRestaurants();
  restaurants = restaurants.filter(restaurant => restaurant['id'] !== id); // Filtro todos los que no tienen el id
  this.setRestaurants(restaurants);
 }

}
