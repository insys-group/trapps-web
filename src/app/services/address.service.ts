import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ng2-resource-rest';
//import { InMemoryDbService } from 'angular-in-memory-web-api';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Address } from '../models/address.model';

interface IResource extends Address {
  links?: any;
  content?: any;  
}

interface IResources extends IResource
 {
  links?: any;
  content?: Array<IResource>;
  page?: any;
}

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

    query(): Observable<IResources> {
       return this.http.get(this.resourceUrl, { headers: this.headers }) 
        .map(response => response.json().data as IResources)
        .do(data => console.log('Addresses : ' + JSON.stringify(data, null, 4)))
        .catch(this.handleError);
    }

   
    get(id: number): Observable<IResource> {
        console.log('AddressService.getAddres id= ' + id + ' and url = ' 
        + `${this.resourceUrl}/${id}`);
        return this.http.get(`${this.resourceUrl}/${id}`)
        .map(response =>response.json().data as IResource)
        .do(data => console.log('Address Found by Id ' + data.id))
        .catch(this.handleError);
    }

    save(address: Address): Observable<IResource> {
        console.log('Enter: AddressService.create()' + JSON.stringify(address));
        return this.http
            .post(this.resourceUrl, address, { headers: this.headers })
            .map(response => response.json().data as IResource)
            .catch(this.handleError);
    }

    update(address: Address): Observable<Address> {
        const url = `${this.resourceUrl}/${address.id}`;
        return this.http
            .put(url, JSON.stringify(address), { headers: this.headers })            
            .map(() => Address)
            .catch(this.handleError);
    }

    remove(id: number): Observable<void> {
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