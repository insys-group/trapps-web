import {Injectable} from '@angular/core';
import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ng2-resource-rest';
import {RequestMethod} from '@angular/http';
import {Address} from '../models/address.model';
import {CRUDResource} from '../resources/crud.resource';
import { Http, Headers, Response } from '@angular/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IResources } from '../resources/crud.resource';


@Injectable()
@ResourceParams({
    url: 'http://localhost:8081/api/v1/addresses'
})
export class AddressService extends CRUDResource<Address> {
constructor(http: Http, injector: Injector) {
      super(http , injector)
        console.log('Instantiating service  AddressService ****************** ' + Date.now());
    }
}

