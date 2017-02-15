import {Injectable, OnInit} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {Business} from "../models/business.model";
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";

@Injectable()
export class BusinessService implements OnInit {
    private headers = new Headers({'Content-Type': 'application/json'});
    private businessesUrl = '/api/businesses';

    constructor(private http: Http, private restService: RestService) {
    }

    ngOnInit() {
    }

    getAll(): Observable<Array<Business>> {
        return this.restService.getAll<Business>(Locations.BUSINESS_URL);
    }

    getOne(id: number): Observable<Business> {
        return this.restService.getOne<Business>(`${Locations.BUSINESS_URL}${id}`);
    }

    updateSubRes(business: Business): Observable<Business> {
        const url = `${Locations.BUSINESS_URL}/${business.id}`;
        return this.restService.update(business);
    }

    createNew(business: Business): Observable<Business> {
        console.log('Enter: BusinessService.create()' + JSON.stringify(business));
        return this.restService.create<Business>(Locations.BUSINESS_URL, business);
    }

    delete(business: Business): Observable<void> {
        const url = `${Locations.BUSINESS_URL}/${business}`;
        return this.restService.delete(business);
    }

}
