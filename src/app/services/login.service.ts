import { Injectable, OnInit } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { NotificationService } from '../services/notification.service'
import { environment } from '../../environments/environment';
import { ErrorResponse } from '../models/rest.model'
import { Link, Locations } from '../models/rest.model';
import { UserInfo } from '../models/user.model';
import { RestService } from '../services/rest.service';
import {LocalStorageService} from "./localstorage.service";
import {ConstantService} from "./constant.service";
import {LoginCredentials, AuthToken} from "../models/login.model";

@Injectable()
export class LoginService implements OnInit {

  private userLoggedIn: boolean = false;
  private loginFail: boolean = false;

  constructor(private http: Http, private restService: RestService, private CONSTANTS: ConstantService) {
    this.userLoggedIn = !!localStorage.getItem('auth_token');
  }

  getUserInfo(username: string): Observable<any> {
    return this.restService.getOne<UserInfo>(Locations.USER_URL+username)
    .do(userInfo => {
      LocalStorageService.set('user_info', userInfo);
    })
  }

  login(credentials: LoginCredentials): Observable<AuthToken> {

    let auth = 'Basic ' + window.btoa(this.CONSTANTS.OAUTH_CLIENT_ID + ':' + this.CONSTANTS.OAUTH_SECRET);
    let authURL = Locations.LOGIN_URL+'?grant_type=password&username='+credentials.username+'&password='+credentials.password;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', auth);

    this.loginFail = false;
    return this.http
      .post(authURL, {}, { headers: headers })
      .map(response => response.json())
      .do(authToken => {
        console.debug('Saving token in localstorage ', authToken);
        LocalStorageService.set('auth_token', authToken);
        this.userLoggedIn = true;
      })
      .catch(error => {
        if(error.status == 401){
          this.loginFail = true;
        }
        return this.handleError(Locations.LOGIN_URL, error, error.json() as AuthToken);
      });

  }

  logout(): void {
    LocalStorageService.remove('auth_token');
    LocalStorageService.remove('user_info');
    this.userLoggedIn = false;
    window.location.href="/login";
  }

  isUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

  isLoginFail(): boolean {
    return this.loginFail;
  }

  private handleError(url: string, error: Response, authToken: AuthToken): Observable<any> {
    let errorResponse: ErrorResponse;
    if(error.status===400) {
      errorResponse=new ErrorResponse(url, `User or password not valid`, error);
    } else {
      errorResponse=new ErrorResponse(url, `Error occured while communicating with services: ${error.json().error}`, error);
    }
    console.error('RestService.handleError() -> ', JSON.stringify(errorResponse));
    return Observable.throw(errorResponse);
  }
  ngOnInit() { }
}