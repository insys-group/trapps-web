import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Person } from '../models/person.model';

@Injectable()
export class PersonService implements OnInit {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private personsUrl = '/api/persons';

    constructor(private http: Http) { 
        console.log('Instantiating service ****************** ' + Date.now());
    }
    ngOnInit() {  }

    getPersons(): Observable<Array<Person>> {
        return this.http.get(this.personsUrl)
        .map(response =>response.json().data as Person[])
        .catch(this.handleError);
    }

    getPerson(id: number): Observable<Person> {
        return this.http.get(`${this.personsUrl}/${id}`)
        .map(response =>response.json().data as Person)
        .do(data => console.log('Person Found by Id ' + data.id))
        .catch(this.handleError);
    }

    create(person: Person): Observable<Person> {
        console.log('Enter: PersonService.create()' + JSON.stringify(person));
        return this.http
            .post(this.personsUrl, person, { headers: this.headers })
            .map(response => response.json().data as Person)
            .catch(this.handleError);
    }

    update(person: Person): Observable<Person> {
        const url = `${this.personsUrl}/${person.id}`;
        return this.http
            .put(url, JSON.stringify(person), { headers: this.headers })            
            .map(() => person)
            .catch(this.handleError);
    }

    delete(id: number): Observable<void> {
        const url = `${this.personsUrl}/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .catch(this.handleError);
    }
    
    private handleError(error: Response): Observable<any> {
        console.error('An error occurred ', error.toString);
        return Observable.throw(error.json().error || 'Server error');
    }
}

export class InMemoryPersonService implements InMemoryDbService {
  createDb() {
      console.log('InMemoryPersonService() *************' + Date.now());
    let persons = [
      {
        "id": 30,
        "firstName": "Muhammad",
        "lastName": "Sabir",
        "phone": "631-983-9075",
        "email": "msabir@insys.com",
        "personType": "Employee",
        "business": "INSYS Group",
        "title": "Architect"
      },
      {
        "id": 31,
        "firstName": "Kris",
        "lastName": "Krishna",
        "phone": "203-456-7890",
        "email": "kshitiz@insys.com",
        "personType": "Employee",
        "business": "INSYS Group",
        "title": "Architect"
      },
      {
        "id": 32,
        "firstName": "Christopher",
        "lastName": "Umbel",
        "phone": "203-456-7890",
        "email": "cumbel@pivotal.io",
        "personType": "Pivotal",
        "business": "Pivotal",
        "title": "Architect"
      },
      {
        "id": 33,
        "firstName": "Michael",
        "lastName": "Forte",
        "phone": "203-456-7890",
        "email": "mforte@accenture.com",
        "personType": "Vendor",
        "business": "Aptium",
        "title": "Manager"
      },
      {
        "id": 34,
        "firstName": "Werner",
        "lastName": "Vogels",
        "phone": "203-456-7890",
        "email": "mforte@comcast.com",
        "personType": "Client",
        "business": "Comcast",
        "title": "Manager"
      }
    ];
    return { persons };
  }
}