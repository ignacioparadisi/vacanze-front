import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiName = environment.baseApiUrl;
    private myInit = {
        headers: {
            'Content-type': 'application/json',
            //'Access-Control-Allow-Origin': 'http://localhost:4200'
        }
    };

    constructor(private http: HttpClient) { }

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
            this.http.post(this.apiName + url, this.myInit).toPromise()
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
