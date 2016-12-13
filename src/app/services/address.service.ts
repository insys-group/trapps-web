
import {Injectable} from '@angular/core';
import {ResourceParams} from 'ng2-resource-rest';
import {Address} from '../models/address.model';
import {CRUDResource} from '../resources/crud.resource';
import { Http, Headers, Response } from '@angular/http';
import { Injector } from '@angular/core';

@Injectable()
@ResourceParams({
})
export class AddressService extends CRUDResource<Address> {
constructor(http: Http, injector: Injector) {
      console.log('Instantiating service  AddressService ****************** ' + Date.now());
      super(http , injector)
    }
}