import { Component, OnInit } from '@angular/core';
import { AuthToken, LoginCredentials } from '../../models/login.model'
import { AuthService } from '../../services/auth.service'
import { NotificationService } from '../../services/notification.service'
import {LocalStorageService} from "../../services/local.storage.service";
import {Router} from "@angular/router";
import {LoadingService} from "../../services/loading.service";
import {UserService} from "../../services/user.service";
import {Validators, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  credentials: LoginCredentials=new LoginCredentials();
  changePassword: boolean = false;
  rememberPassword: boolean = false;

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
      authToken => {

        this.loadingService.hide();

        this.authService.saveTempToken(authToken);

        if(this.authService.isLoginFail()){
          this.notificationService.error('Login fail, please check credentials.');
        }

        this.userService.getUserInfo(this.credentials.username)
        .subscribe(
          userInfo => {
            console.log('Loaded User ', userInfo);
            if(userInfo.passwordChanged){
              this.authService.saveToken(authToken);
              LocalStorageService.set('user_info', userInfo);
              window.location.href="/";
            } else {
              // this.authService.removeToken();
              this.changePassword = true;
              this.notificationService.info('Please change your password.');
            }

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

  validateChangePassword(){
    return this.credentials.password && this.credentials.repeatPassword
      && this.credentials.password == this.credentials.repeatPassword;
  }

  saveNewPassword(){
    this.loadingService.show();
    this.authService.saveNewPassword(this.credentials)
      .subscribe(
        password => {
          this.loadingService.hide();
          this.login();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  resetPassword(){
    this.loadingService.show();
    this.authService.resetPassword(this.credentials)
      .subscribe(
        password => {
          this.loadingService.hide();
          this.rememberPassword = false;
          this.notificationService.info('Thank you, if we find any coincidence with your account, you\'ll recieve an email.');
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

}
