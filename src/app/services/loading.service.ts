import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";
import {User} from "../models/user.model";

@Injectable()
export class LoadingService {

  loading: boolean = false;

  constructor() {
  }

  getLoading(){
    return this.loading;
  }

  show(){
    this.loading = true;
  }

  hide(){
    this.loading = false;
  }

}
