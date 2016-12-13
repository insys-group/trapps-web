import {Injectable} from '@angular/core';
import {ResourceParams} from 'ng2-resource-rest';
import {Business} from '../models/business.model';
import {CRUDResource} from '../resources/crud.resource';
import { Http, Headers, Response } from '@angular/http';
import { Injector } from '@angular/core';


@Injectable()
@ResourceParams({
    url: 'http://localhost:8081/api/v1/businesses'
})
export class BusinessService extends CRUDResource<Business> {
constructor(http: Http, injector: Injector) {
      super(http , injector)
        console.log('Instantiating service  BusinessService ****************** ' + Date.now());
    }
}