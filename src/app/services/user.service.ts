import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";
import {User, UserInfo} from "../models/user.model";
import {LocalStorageService} from "./local.storage.service";

@Injectable()
export class UserService {

  constructor(private restService: RestService) {
  }

  getUsers(): Observable<Array<User>> {
    return this.restService.getAll<User>(Locations.USERS_URL);
  }

  getUser(username : string): Observable<User> {
    return this.restService.getOne<User>(Locations.USERS_URL+username);
  }

  save(user : User){
    return this.restService.create<User>(Locations.USERS_URL, user);
  }

  new(user : User){
    return this.restService.create<User>(Locations.NEW_USER_URL, user);
  }

  remove(user : User){
    return this.restService.delete(user);
  }

  getUserInfo(username: string): Observable<any> {
    return this.restService.getOne<UserInfo>(Locations.USER_URL+username)
      .do(userInfo => {
        LocalStorageService.set('user_info', userInfo);
      })
  }

}
