/***********************************************************
* Servicio general para guardar los datos de manera local  *
************************************************************/
import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { Observable } from 'rxjs';
import { from, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    public userUpdater = new Subject();
    
    /**************************************************
    * Metodo para setear la data en el Local Storage  *
    ***************************************************/
    public setItem<T>(key: string, value: T): Observable<T> {
        return from(localforage.setItem(key, value));
    }

    /************************************************
    * Metodo para obtener la data del Local Storage *
    *************************************************/
    public getItem<T>(key: string): Observable<any> {
        return from(localforage.getItem(key));
    }

    /*************************************************************
    * Metodo para remover la data del Local Storage segun su key *
    **************************************************************/
    public removeItem(key: string): Observable<void> {
        return from(localforage.removeItem(key));
    }

}
