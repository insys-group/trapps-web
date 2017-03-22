import { Component, OnInit } from '@angular/core';
import { AuthToken, LoginCredentials } from '../../models/login.model'
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

  credentials: LoginCredentials=new LoginCredentials();
  loginFail: boolean = false;

  constructor(private loginService: LoginService,
              private notificationService: NotificationService,
              private router: Router) {
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

        this.loginService.getUserInfo(this.credentials.username)
        .subscribe(
          userInfo => {
            console.log('Loaded User ', userInfo);
            LocalStorageService.set('user_info', userInfo);
            window.location.href="/";
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
    this.credentials=new LoginCredentials();
    this.credentials.username='';
    this.credentials.password='';
  }

}
