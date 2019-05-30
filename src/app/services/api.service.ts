import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { containerRefreshEnd } from '@angular/core/src/render3';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiName = environment.baseApiUrl;
  private myInit = {
    /* headers: {
      'x-api-key': environment.apiKey
    } */
  };

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44362/api';

  /*******************************************************
  * Metodo para realizar el consumo del API de tipo GET  *
  ********************************************************/
  public getUrl<T>(url: string, parameter?: Array<string>): Promise<T> {
    // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
    if (parameter && url && url.indexOf('{') !== -1) {
      parameter.forEach(p => {
        url = url.replace(/{[a-zA-Z_]*}/, p);
      });
    }
    return <Promise<T>>this.http.get(this.apiName + url).toPromise();
  }

  /*******************************************************
  * Metodo para realizar el consumo del API de tipo POST *
  ********************************************************/
  public postUrl<T>(url, data, parameter?: Array<string>): Promise<T> {
    // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
    if (parameter && url && url.indexOf('{') !== -1) {
      parameter.forEach(p => {
        url = url.replace(/{[a-zA-Z_]*}/, p);
      });
    }

    this.myInit['body'] = data;
    return <Promise<T>>(
      this.http.post(this.apiName + url, data).toPromise()
    );
  }

  /*******************************************************
  * Metodo para realizar el consumo del API de tipo PUT  *
  ********************************************************/
  public putUrl<T>(url, data?, parameter?: Array<string>): Promise<T> {
    // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
    if (parameter && url && url.indexOf('{') !== -1) {
      parameter.forEach(p => {
        url = url.replace(/{[a-zA-Z_]*}/, p);
      });
    }

    this.myInit['body'] = data;
    return <Promise<T>>(
      this.http.put(this.apiName + url, data).toPromise()
    );
  }
  login(formData) {
    return this.http.post(this.BaseURI + '/UserProfile/Login', formData);
  }



  /***************************************************************************
  * Metodo para realizar el consumo del API de tipo DELETE con body incluido *
  ****************************************************************************/
  public deleteUrlWithBody<T>(url, data, parameter?: Array<string>): Promise<T> {
    // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
    if (parameter && url && url.indexOf('{') !== -1) {
      parameter.forEach(p => {
        url = url.replace(/{[a-zA-Z_]*}/, p);
      });
    }

    this.myInit['body'] = data;
    return <Promise<T>>(
      this.http.delete(this.apiName + url, this.myInit).toPromise()
    );
  }


  // =================================================================================
  // ==Llamado a la API para el envio de corre de recuperacion de contraseña==========
  // =================================================================================

  sendEmail() {

  }
}
