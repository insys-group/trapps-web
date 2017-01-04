import {Injectable} from '@angular/core';
import {ResourceParams} from 'ng2-resource-rest';
import {Business} from '../models/business.model';
import { Locations } from '../models/rest.model';
import {CRUDResource} from '../resources/crud.resource';
import { Http, Headers, Response } from '@angular/http';
import { Injector } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
@ResourceParams({
    url: Locations.BUSINESS_URL
})
export class BusinessService extends CRUDResource<Business> {
constructor(http: Http, injector: Injector) {
      super(http , injector)
    }
}
