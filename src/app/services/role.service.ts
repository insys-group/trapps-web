import {Injectable, OnInit} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Injector} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Role} from "../models/role.model";
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";

@Injectable()
export class RoleService {

  constructor(private restService: RestService) {
  }

  getAll(): Observable<Array<Role>> {
    return this.restService.getAll<Role>(Locations.ROLE_URL);
  }

}
