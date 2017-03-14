import { Component, OnInit } from '@angular/core';
import { AuthToken, PasswordCredentials } from '../../models/login.model'
import { Locations } from '../../models/rest.model'
import { LoginService } from '../../services/login.service'
import { RestService } from '../../services/rest.service'
import { NotificationService } from '../../services/notification.service'
import {LocalStorageService} from "../../services/localstorage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: PasswordCredentials=new PasswordCredentials();
  loginFail: boolean = false;

  constructor(private loginService: LoginService,
              private notificationService: NotificationService,
              private router: Router) {
    this.credentials.username='admin';
    this.credentials.password='password';
  }

  ngOnInit() {
    console.log("Enter: LoginComponent.ngOnInit()");
  }

  login(): void {
    this.loginFail = false;
    this.loginService.login(this.credentials)
    .subscribe(
      result => {

        if(this.loginService.isLoginFail()){
          this.loginFail = true;
        }

        console.log('User Logged in ' + JSON.stringify(result));
        this.loginService.getUserInfo()
        .subscribe(
          userInfo => {
            console.log('Loaded User ', userInfo);
            LocalStorageService.set('user_info', userInfo);
            window.location.href="/home";
          },
          error => this.notificationService.notifyError(error)
        );
      },
      error => {
        console.log('loginService error');
        if(this.loginService.isLoginFail()){
          this.loginFail = true;
        } else {
          this.notificationService.notifyError(error)
        }
      }
    );
  }

  reset(): void {
    this.credentials=new PasswordCredentials();
    this.credentials.username='admin';
    this.credentials.password='password';
  }

}
