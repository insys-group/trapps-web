import {Injectable} from '@angular/core';
import {ResourceParams} from 'ng2-resource-rest';
import {CRUDResource} from '../resources/crud.resource';
import { Http, Headers, Response } from '@angular/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Person, PersonSkill, PersonDocument } from '../models/person.model';

@Injectable()
@ResourceParams({
    url: 'http://localhost:8081/api/v1/persons' 
})
export class PersonService extends CRUDResource<Person> {
constructor(http: Http, injector: Injector) {
      console.log('Instantiating service  NewPersonService ****************** ' + Date.now());
      super(http , injector)
    }

    getPersonSkills(personId: number): Observable<Array<PersonSkill>> {
        return null;
    }

    createSkill(personSkill: PersonSkill): Observable<PersonSkill> {
        console.log('Enter: PersonService.createSkill()' + JSON.stringify(personSkill));
         return null;
    }

    createSkills(personSkills: PersonSkill[]): Observable<PersonSkill[]> {
         return null;
    }

    deleteSkill(id: number): Observable<void> {
        return null;
    }

    getPersonDocuments(personId: number): Observable<Array<PersonDocument>> {
        return null;
    }

}

