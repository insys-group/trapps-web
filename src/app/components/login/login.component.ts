import { Component, OnInit } from '@angular/core';
import { AuthToken, LoginCredentials } from '../../models/login.model'
import { AuthService } from '../../services/auth.service'
import { NotificationService } from '../../services/notification.service'
import {LocalStorageService} from "../../services/local.storage.service";
import {Router} from "@angular/router";
import {LoadingService} from "../../services/loading.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  credentials: LoginCredentials=new LoginCredentials();
  showRegister: boolean = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private notificationService: NotificationService,
              private router: Router,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    console.log("Enter: LoginComponent.ngOnInit()");
  }

  login(): void {
    this.loadingService.show();
    this.authService.login(this.credentials)
    .subscribe(
      result => {

        this.loadingService.hide();

        if(this.authService.isLoginFail()){
          this.notificationService.error('Login fail, please check credentials.');
        }

        this.userService.getUserInfo(this.credentials.username)
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
        this.loadingService.hide();
        console.log('authService error');
        if(this.authService.isLoginFail()){
          this.notificationService.error('Login fail, please check credentials.');
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

  register(){

  }

}
