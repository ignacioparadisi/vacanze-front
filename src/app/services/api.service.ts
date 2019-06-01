import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { containerRefreshEnd } from '@angular/core/src/render3';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:5001/api';
  private apiName = environment.baseApiUrl;
  private myInit = {
  };



  /*******************************************************
  * Metodo para realizar el consumo del API de tipo GET  *
  ********************************************************/
  public getUrl(url: string, parameter?: Array<string>): Promise<any> {
    // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
    if (parameter && url && url.indexOf('{') !== -1) {
      parameter.forEach(p => {
        url = url.replace(/{[a-zA-Z_]*}/, p);
      });
    }
    return <Promise<any>>this.http.get(this.apiName + url).toPromise();
  }

  /*******************************************************
  * Metodo para realizar el consumo del API de tipo POST *
  ********************************************************/
  public postUrl(url, data, parameter?: Array<string>): Promise<any> {
    // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
    if (parameter && url && url.indexOf('{') !== -1) {
      parameter.forEach(p => {
        url = url.replace(/{[a-zA-Z_]*}/, p);
      });
    }

    this.myInit['body'] = data;
    return <Promise<any>>(
      this.http.post(this.apiName + url, this.myInit['body'], httpOptions).toPromise()
    );
  }

  /*******************************************************
  * Metodo para realizar el consumo del API de tipo PUT  *
  ********************************************************/
  public putUrl(url, data?, parameter?: Array<string>): Promise<any> {
    // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
    if (parameter && url && url.indexOf('{') !== -1) {
      parameter.forEach(p => {
        url = url.replace(/{[a-zA-Z_]*}/, p);
      });
    }

    this.myInit['body'] = data;
    return <Promise<any>>(
      this.http.put(this.apiName + url, this.myInit['body'], httpOptions).toPromise()
    );
  }

  /**********************************************************
  * Metodo para realizar el consumo del API de tipo DELETE  *
  ***********************************************************/
  public deleteUrl(url, parameter?: Array<string>): Promise<any> {
    // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
    if (parameter && url && url.indexOf('{') !== -1) {
      parameter.forEach(p => {
        url = url.replace(/{[a-zA-Z_]*}/, p);
      });
    }

    return <Promise<any>>(
      this.http.delete(this.apiName + url).toPromise()
    );
  }
  /***************************************************************************
  * Metodo para realizar el consumo del API de tipo DELETE con body incluido *
  ****************************************************************************/
  public deleteUrlWithBody(url, data, parameter?: Array<string>): Promise<any> {
    // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
    if (parameter && url && url.indexOf('{') !== -1) {
      parameter.forEach(p => {
        url = url.replace(/{[a-zA-Z_]*}/, p);
      });
    }

    this.myInit['body'] = data;
    return <Promise<any>>(
      this.http.delete(this.apiName + url, this.myInit['body']).toPromise()
    );
  }


  // =================================================================================
  // ==Llamado a la API para el envio de corre de recuperacion de contraseña==========
  // =================================================================================


}
