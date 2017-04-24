import {Injectable, OnInit} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ErrorResponse} from '../models/rest.model'
import {Locations} from '../models/rest.model';
import {LocalStorageService} from "./local.storage.service";
import {ConstantService} from "./constant.service";
import {LoginCredentials, AuthToken} from "../models/login.model";
import {RestService} from "./rest.service";
import {User} from "../models/user.model";

@Injectable()
export class AuthService implements OnInit {

  private userLoggedIn: boolean = false;
  private loginFail: boolean = false;

  constructor(private http: Http,
              private CONSTANTS: ConstantService,
              private restService: RestService,
  ) {
    this.userLoggedIn = !!localStorage.getItem('auth_token');
  }

  ngOnInit() {
  }

  saveToken(authToken) {
    LocalStorageService.remove('temp_token');
    LocalStorageService.set('auth_token', authToken);
    this.userLoggedIn = true;
  }

  saveTempToken(authToken) {
    LocalStorageService.remove('auth_token');
    LocalStorageService.remove('user_info');
    LocalStorageService.set('temp_token', authToken);
    this.userLoggedIn = false;
  }

  login(credentials: LoginCredentials): Observable<AuthToken> {

    let auth = 'Basic ' + window.btoa(this.CONSTANTS.OAUTH_CLIENT_ID + ':' + this.CONSTANTS.OAUTH_SECRET);
    let authURL = Locations.OAUTH_URL + '?grant_type=password&username=' + credentials.username + '&password=' + credentials.password;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', auth);

    this.loginFail = false;
    return this.http
      .post(authURL, {}, {headers: headers})
      .map(response => response.json())
      .do(authToken => {
        //
      })
      .catch(error => {
        if (error.status == 400 || error.status == 401) {
          this.loginFail = true;
        }
        return this.handleError(authURL, error, error.json() as AuthToken);
      });

  }

  refreshToken(): Observable<any> {

    console.debug('Refreshing token...');

    let token = LocalStorageService.get('auth_token');

    let auth = 'Basic ' + window.btoa(this.CONSTANTS.OAUTH_CLIENT_ID + ':' + this.CONSTANTS.OAUTH_SECRET);
    let authURL = Locations.OAUTH_URL + '?grant_type=refresh_token&refresh_token=' + token.refresh_token;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', auth);

    return this.http
      .post(authURL, {}, {headers: headers})
      .map(response => response.json())
      .do(authToken => {
        LocalStorageService.set('auth_token', authToken);
        console.debug('Token refreshed.');
      })
      .catch(error => {
        if (error.status == 401) {
          this.loginFail = true;
        }
        return this.handleError(authURL, error, error.json() as AuthToken);
      });

  }

  logout(): void {
    LocalStorageService.remove('temp_token');
    LocalStorageService.remove('auth_token');
    LocalStorageService.remove('user_info');
    this.userLoggedIn = false;
    window.location.href = "/";
  }

  isUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

  isLoginFail(): boolean {
    return this.loginFail;
  }

  private handleError(url: string, error: Response, authToken: AuthToken): Observable<any> {
    let errorResponse: ErrorResponse;
    if (error.status === 400) {
      errorResponse = new ErrorResponse(url, `User or password not valid`, error);
    } else {
      errorResponse = new ErrorResponse(url, `Error occured while communicating with services: ${error.json().error}`, error);
    }
    console.error('RestService.handleError() -> ', JSON.stringify(errorResponse));
    return Observable.throw(errorResponse);
  }

  saveNewPassword(credentials : LoginCredentials){
    return this.restService.post<User>(Locations.CHANGE_PASSWORD_URL, credentials);
  }

  resetPassword(credentials : LoginCredentials){
    return this.restService.insecurePost<User>(Locations.RESET_PASSWORD_URL, credentials);
  }

}