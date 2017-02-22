import {Injectable} from '@angular/core';
import {ResourceParams} from 'ng2-resource-rest';
import {Business} from '../models/business.model';
import {Locations} from '../models/rest.model';
import {CRUDResource} from '../resources/crud.resource';
import {Http, Headers, Response} from '@angular/http';
import {Injector} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {RestService} from "./rest.service";

@Injectable()
@ResourceParams({
  url: Locations.BUSINESS_URL
})
export class BusinessService extends CRUDResource<Business> {

  constructor(http: Http, injector: Injector, private restService: RestService) {
    super(http, injector)
  }

  getBusinesses(): Observable<Array<Business>> {
    return this.restService.getAll<Business>(Locations.BUSINESS_URL);
  }

}
