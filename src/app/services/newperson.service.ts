import {Injectable} from '@angular/core';
import {ResourceParams} from 'ng2-resource-rest';
import {Person} from '../models/person.model';
import {CRUDResource} from '../resources/crud.resource';
import { Http, Headers, Response } from '@angular/http';
import { Injector } from '@angular/core';

@Injectable()
@ResourceParams({
    url: 'http://localhost:8081/api/v1/persons' 
})
export class NewPersonService extends CRUDResource<Person> {
constructor(http: Http, injector: Injector) {
      console.log('Instantiating service  NewPersonService ****************** ' + Date.now());
      super(http , injector)
    }
}

