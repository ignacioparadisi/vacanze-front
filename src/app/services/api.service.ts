import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

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

  constructor(private http: HttpClient) { }

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

  /**********************************************************
  * Metodo para realizar el consumo del API de tipo DELETE  *
  ***********************************************************/
  public deleteUrl<T>(url, parameter?: Array<string>): Promise<T> {
    // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
    if (parameter && url && url.indexOf('{') !== -1) {
      parameter.forEach(p => {
        url = url.replace(/{[a-zA-Z_]*}/, p);
      });
    }

    return <Promise<T>>(
      this.http.delete(this.apiName + url).toPromise()
    );
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

}
