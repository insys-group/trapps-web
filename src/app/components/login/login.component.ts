import { Component, OnInit } from '@angular/core';
import { AuthToken, PasswordCredentials } from '../../models/login.model'
import { Locations } from '../../models/rest.model'
import { LoginService } from '../../services/login.service'
import { RestService } from '../../services/rest.service'
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: PasswordCredentials=new PasswordCredentials();

  constructor(private loginService: LoginService, private notificationService: NotificationService) { 
    this.credentials.username='admin';
    this.credentials.password='password';
  }

  ngOnInit() {
    console.log("Enter: LoginComponent.ngOnInit()");
  }

  login(): void {
    this.loginService.login(this.credentials)
    .subscribe(
      result => {
        console.log('User Logged in ' + JSON.stringify(result));
        this.loginService.getUserInfo()
        .subscribe(
          userInfo => console.log('Loaded User ' + userInfo.firstName),
          error => this.notificationService.notifyError(error)
        );
      },
      error => this.notificationService.notifyError(error)
    );
  }

  reset(): void {
    this.credentials=new PasswordCredentials();
    this.credentials.username='admin';
    this.credentials.password='password';
  }

}
