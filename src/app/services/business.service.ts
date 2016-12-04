import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


import { Business } from '../models/business.model';

@Injectable()
export class BusinessService implements OnInit {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private businessesUrl = '/api/businesses';

    constructor(private http: Http) { 
        console.log('Instantiating service ****************** ' + Date.now());
    }
    ngOnInit() {  }

    getBusinesses(): Observable<Array<Business>> {
        return this.http.get(this.businessesUrl)
        .map(response =>response.json().data as Business[])
        .catch(this.handleError);
    }

    getBusiness(id: number): Observable<Business> {
        return this.http.get(`${this.businessesUrl}/${id}`)
        .map(response =>response.json().data as Business)
        .do(data => console.log('Business Found by Id ' + data.id))
        .catch(this.handleError);
    }

    create(business: Business): Observable<Business> {
        console.log('Enter: BService.create()' + JSON.stringify(business));
        return this.http
            .post(this.businessesUrl, business, { headers: this.headers })
            .map(response => response.json().data as Business)
            .catch(this.handleError);
    }

    update(business: Business): Observable<Business> {
        const url = `${this.businessesUrl}/${business.id}`;
        return this.http
            .put(url, JSON.stringify(business), { headers: this.headers })            
            .map(() => business)
            .catch(this.handleError);
    }

    delete(id: number): Observable<void> {
        const url = `${this.businessesUrl}/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .catch(this.handleError);
    }
    
    private handleError(error: Response): Observable<any> {
        console.error('An error occurred ', error.toString);
        return Observable.throw(error.json().error || 'Server error');
    }
}

export class InMemoryBusinessService implements InMemoryDbService {
  createDb() {
      console.log('InMemoryBusinessService() *************' + Date.now());
    let businesses = [
      {
        "id": 30,
        "name": "Pivotal-Labs",
        "description": "Pivotal-Labs for trainging and R&D",
        "addresses": "pivtoal-lab street",
        "businessType": "PivotalLabs"
      },
      {
         "id": 31,
        "name": "Client",
        "description": "Business for CF and Spring",
        "addresses": "client 1 street",
        "businessType": "Client"
      },
      {
         "id": 32,
        "name": "Pivotal",
        "description": "Business Partners for Technologies",
        "addresses": "pivotal 1 street",
        "businessType": "Pivotal"
      },
      {
        "id": 33,
        "name": "Vendor",
        "description": "Business Vednors for Technologies",
        "addresses": "vendor 1 street",
        "businessType": "Vendor"
      },
      {
        "id": 34,
        "name": "Insys",
        "description": "Insys group for Technologies",
        "addresses": "isnys 1 street",
        "businessType": "Insys"
      }
    ];
    return { businesses };
  }
}

