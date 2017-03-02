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

@Injectable()
export class LoginService implements OnInit {
  private userLoggedIn: boolean = false;

  constructor(private http: Http, private restService: RestService) {
    this.userLoggedIn = !!localStorage.getItem('auth_token');
  }

  getUserInfo(): Observable<any> {
    return this.restService.getOne<UserInfo>(Locations.USER_URL)
    .do(userInfo => {
      localStorage.setItem('user_info', JSON.stringify(userInfo));
    })
  }

  login(credentials: PasswordCredentials): Observable<AuthToken> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
      .post(Locations.LOGIN_URL, credentials, { headers: headers })
      .map(response => response.json() as AuthToken)
      .do(authToken => {
        console.debug('Saving token in localstorage ' + JSON.stringify(authToken));
        localStorage.setItem('auth_token', JSON.stringify(authToken));
        this.userLoggedIn = true;
      })
      .catch(error => {
        console.error('Error on login ' + JSON.stringify(error));
        return this.handleError(Locations.LOGIN_URL, error, error.json() as AuthToken);
      });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this.userLoggedIn = false;
  }

  isUserLoggedIn(): boolean {
    return this.userLoggedIn;
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