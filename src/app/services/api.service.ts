import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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

    constructor(private fb: FormBuilder,private http: HttpClient) { }
    readonly BaseURI='https://localhost:44362/api';

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
            this.http.post(this.apiName + url, data).toPromise()
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
            this.http.put(this.apiName + url, data).toPromise()
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
    login(formData) {
        return this.http.post(this.BaseURI + '/UserProfile/Login', formData);
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
            this.http.delete(this.apiName + url, this.myInit).toPromise()
        );
    }

}
