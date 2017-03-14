import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AuthToken, PasswordCredentials } from '../models/login.model'
import { NotificationService } from '../services/notification.service'
import { environment } from '../../environments/environment';
import { ErrorResponse } from '../models/rest.model'
import { Link, Locations } from '../models/rest.model';
import { UserInfo } from '../models/user.model';
import { RestService } from '../services/rest.service';
import {LocalStorageService} from "./localstorage.service";

@Injectable()
export class LoginService implements OnInit {

  private userLoggedIn: boolean = false;
  private loginFail: boolean = false;

  constructor(private http: Http, private restService: RestService) {
    this.userLoggedIn = !!localStorage.getItem('auth_token');
  }

  getUserInfo(): Observable<any> {
    return this.restService.getOne<UserInfo>(Locations.USER_URL)
    .do(userInfo => {
      LocalStorageService.set('user_info', userInfo);
    })
  }

  login(credentials: PasswordCredentials): Observable<AuthToken> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.loginFail = false;
    return this.http
      .post(Locations.LOGIN_URL, credentials, { headers: headers })
      .map(response => response.json() as AuthToken)
      .do(authToken => {
        console.debug('Saving token in localstorage ' + JSON.stringify(authToken));
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
      errorResponse=new ErrorResponse(url, `User or password not valid (${authToken.errorDescription})`, error);
    } else {
      errorResponse=new ErrorResponse(url, `Error occured while communicating with services: ${error.json().error}`, error);
    }
    console.error('RestService.handleError() -> ', JSON.stringify(errorResponse));
    return Observable.throw(errorResponse);
  }
  ngOnInit() { }
}