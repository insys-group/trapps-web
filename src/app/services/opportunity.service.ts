import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";
import {Opportunity} from "../models/opportunity/opportunity.model";

@Injectable()
export class OpportunityService {

  constructor(private restService: RestService) {
  }

  getOpportunities(): Observable<Array<Opportunity>> {
    return this.restService.getAll<Opportunity>(Locations.OPPORTUNITY_URL);
  }

  getOpportunity(id : number): Observable<Opportunity> {
    return this.restService.getOne<Opportunity>(Locations.OPPORTUNITY_URL+id);
  }

  saveOpportunity(opportunity : Opportunity){
    return this.restService.create<Opportunity>(Locations.OPPORTUNITY_URL, opportunity);
  }

  removeOpportunity(opportunity : Opportunity){
    return this.restService.delete(opportunity);
  }

}
