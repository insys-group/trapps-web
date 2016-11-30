import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

import { Person } from '../models/person.model';
@Injectable()
export class PersonService {
    constructor(private http: Http) {}

    getPersons() {
        return this.http.get('/api/persons.json')
        .map((response: Response) => <Person[]>response.json().data)
        .do(data => console.log(data))
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}