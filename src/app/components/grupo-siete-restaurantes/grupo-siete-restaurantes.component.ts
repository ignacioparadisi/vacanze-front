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

  constructor(private router: Router, private service: ApiService) {
    this.headerTitle = 'Lista de Restaurantes';
    this.tableRestaurantsHeader = ['Nombre', 'Capacidad',
                                   'Calificación', 'Especialidad',
                                   'Precio', 'Telefono', 'Direccion', 'Status'];
    this.loadRestaurants();
  }

  ngOnInit() {
    if(this.router.url === '/administrar-restaurantes/agregar-restaurant' ||
        this.router.url.indexOf('editar-restaurant') !== -1){
      this.isEditingRestaurant = true;
      this.isCreatingRestaurant = true;
    }
    else {
      this.isEditingRestaurant = false;
      this.isCreatingRestaurant = false;
    }
    this.loadRestaurants();
  }

  public getAlertAction(action: string) {
    console.log(action['delete']);
    if (action['delete']) {
      if (action['confirmed']) {
        // console.log(action);
        this.deleteRestaurant(action['id']);
      }
    } else {
      if (action['confirmed']) {
          console.log('se quiere actualizar el estatus del restaurantes ', action);
          this.changeRestaurantStatus(action);
      }
    }
  }


  public getCurrentRoute(route) {
    if (route === '/agregar-restaurant') {
      this.isEditingRestaurant = true;
      this.isCreatingRestaurant = false;
      this.router.navigate(['administrar-restaurantes', 'agregar-restaurant']);
    } else if (route.indexOf('/editar-restaurant') !== -1) {
      this.isCreatingRestaurant = true;
      this.isEditingRestaurant = true;
      this.router.navigate(['administrar-restaurantes', 'editar-restaurant', route.split('/')[2] ]);
    } else {
      this.isCreatingRestaurant = false;
      this.isEditingRestaurant = false;
    }
  }

  public getDeactivatedComponent(component) {
    this.loadRestaurants();
    this.getCurrentRoute('/administrar-restaurantes');
  }

  public loadRestaurants() {
        this.service
        .getUrl(url.endpoint.default._get.getRestaurant)
        .then(response => {
              // console.log("Cargan los restaurantes", response),
              this.tableData = response;
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
              this.alertStatus(200, true);
              this.loadRestaurants();
        }).catch( error => {
              this.alertStatus(500, true);
              console.log('Error en el delete del restaurante', error);
        });
  }

  public changeRestaurantStatus(restaurant) {
      if (restaurant['isActive'] === true) {
          this.service
          .putUrl(url.endpoint.default._put.putRestaurant,
            {
              id: restaurant['id'],
              name: restaurant['name'],
              capacity: restaurant['capacity'],
              isActive : false,
              qualify: restaurant['qualify'],
              specialty: restaurant['specialty'],
              price: restaurant['price'],
              businessName: restaurant['businessName'],
              picture: restaurant['picture'],
              description: restaurant['description'],
              phone: restaurant['phone'],
              location: restaurant['location'],
              address: restaurant['address']
            })
          .then(
            response => {
              this.restaurantEditedSuccessfully();
              console.log('Exito al modificar ', restaurant.id),
              // this.alertStatus(200, true);
              this.loadRestaurants();
            }).catch(
              error => {
                console.log('Error actualizando el estatus del restaurante');
              }
            );
        } else {
          this.service
          .putUrl(url.endpoint.default._put.putRestaurant,
            {
              id: restaurant['id'],
              name: restaurant['name'],
              capacity: restaurant['capacity'],
              isActive : true,
              qualify: restaurant['qualify'],
              specialty: restaurant['specialty'],
              price: restaurant['price'],
              businessName: restaurant['businessName'],
              picture: restaurant['picture'],
              description: restaurant['description'],
              phone: restaurant['phone'],
              location: restaurant['location'],
              address: restaurant['address']
            })
          .then(
            response => {
              this.restaurantEditedSuccessfully();
              console.log('Exito al modificar ', restaurant.id),
              // this.alertStatus(200, true);
              this.loadRestaurants();
            }).catch(
              error => {
                console.log('Error actualizando el estatus del restaurante');
              }
            );
        }
  }

  private restaurantEditedSuccessfully() {
    let config: SweetAlertOptions = {
      title: 'Restaurante actualizado',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    };
    Swal.fire(config).then( result => {
    });
  }

  private alertStatus(statusCode: number, deleted: boolean) {
    const config: SweetAlertOptions = {
      title: (statusCode !== 200 ? 'Se ha producido un error' : (deleted ? 'Restaurante eliminado' : 'Se cambió el estatus del restaurante')),
      type:  (statusCode === 200 ? 'success' : 'error'),
      showConfirmButton: true
    };
    Swal.fire(config).then( result => {
      
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
  * Metodo para setear la variable de restaurantes *
  **********************************************/
 public setRestaurants(restaurants: Array<Object>) {
  this.tableData = restaurants;
}

/************************************************
* Metodo para retornar la variable de restaurantes  *
*************************************************/
public getVariableRestaurants(): Array<Object> {
  return this.tableData;
}

  /***************************************************************
  * Metodo que se ejecuta para actualizar el arreglo de restaurantes *
  * debido a la elminacion del restaurante por el id                 *
  ****************************************************************/

 public deleteRestaurantById(id: number) {
  let restaurants = this.getVariableRestaurants();
  restaurants = restaurants.filter(restaurant => restaurant['id'] !== id); // Filtro todos los que no tienen el id
  this.setRestaurants(restaurants);
 }

}
