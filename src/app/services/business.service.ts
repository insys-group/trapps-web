import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Business, BusinessType } from '../models/business.model';

@Injectable()
export class BusinessService implements OnInit {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private businessesUrl = '/api/businesses';

    constructor(private http: Http) {
        console.log('Instantiating service ****************** ' + Date.now());
    }

    ngOnInit() {}

    getBusinesses(): Observable<Array<Business>> {
        return this.http.get(this.businessesUrl)
        .map(response => response.json().data as Business[])
        .catch(this.handleError);
    }

    getBusiness(id: number): Observable<Business> {
        return this.http.get(`${this.businessesUrl}/${id}`)
        .map(response => response.json().data as Business)
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
