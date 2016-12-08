import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
<<<<<<< HEAD
=======
import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ng2-resource-rest';
//import { InMemoryDbService } from 'angular-in-memory-web-api';
>>>>>>> 09f0104ea082f711055d58009ece1253288e1b3a

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Address } from '../models/address.model';

@Injectable()
export class AddressService implements OnInit {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private resourceUrl = 'http://localhost:8081/api/v1/addresses';

    constructor(private http: Http) { 
        console.log('Instantiating service ****************** AddressService ' + Date.now());
    }

    ngOnInit() {
      console.log('ngOnInit ****************** AddressService ' + Date.now());
     }

    getAddresses(): Observable<Array<Address>> {
       return this.http.get(this.resourceUrl) 
        .map((response: Response) => response.json().data._embedded.addresses)
        .do(data => console.log('Addresses : ' + data))
        .catch(this.handleError);
    }

   
    getAddress(id: number): Observable<Address> {
        console.log('AddressService.getAddres id= ' + id + ' and url = ' 
        + `${this.resourceUrl}/${id}`);
        return this.http.get(`${this.resourceUrl}/${id}`)
        .map(response =>response.json().data as Address)
        .do(data => console.log('Address Found by Id ' + data.id))
        .catch(this.handleError);
    }

    create(Address: Address): Observable<Address> {
        console.log('Enter: AddressService.create()' + JSON.stringify(Address));
        return this.http
            .post(this.resourceUrl, Address, { headers: this.headers })
            .map(response => response.json().data as Address)
            .catch(this.handleError);
    }

    update(Address: Address): Observable<Address> {
        const url = `${this.resourceUrl}/${Address.id}`;
        return this.http
            .put(url, JSON.stringify(Address), { headers: this.headers })            
            .map(() => Address)
            .catch(this.handleError);
    }

    delete(id: number): Observable<void> {
        const url = `${this.resourceUrl}/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .catch(this.handleError);
    }


    private handleError(error: Response): Observable<any> {
        console.error('An error occurred ', error.toString);
        return Observable.throw(error.json().error || 'Server error');
    }
}

