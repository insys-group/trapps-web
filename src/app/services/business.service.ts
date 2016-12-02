import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'


import { Business } from '../models/business.model';

@Injectable()
export class BusinessService {
    constructor(private http: Http) {}

    getBusinesses() {
        return this.http.get('/api/businesses.json')
        .map((response: Response) => <Business[]>response.json().data)
        .do(data => console.log(data))
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

