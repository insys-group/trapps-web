import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import {LocalStorageService} from "./services/local.storage.service";
import {AuthService} from "./services/auth.service";
import {LoadingService} from "./services/loading.service";
import {AlertService, AlertMessage} from "./services/alert.service";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";
import {ConstantService} from "./services/constant.service";
import {NotificationService} from "./services/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Trapps';
  environment = environment;
  userLoggedIn = LocalStorageService.get('user_info');
  authToken = LocalStorageService.get('auth_token');

  objAlert: AlertMessage;

  constructor(private router: Router,
              private authService: AuthService,
              private loadingService: LoadingService,
              private alertService: AlertService,
              private CONSTANTS: ConstantService,
              private notificationService: NotificationService) {
  }

  public alertOptions = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: false,
  };

  private refreshToken(): void {
    this.authService.refreshToken()
      .subscribe(
        token => {
          this.loadingService.hide();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      );
  }

  ngOnInit(): void {
    console.debug(this.userLoggedIn);
    this.alertService.alertStatus.subscribe((val: AlertMessage) => {
      this.objAlert = { show: val.show, message: val.message, type: val.type };
    });

    if(this.authToken) {
      this.refreshToken();
      IntervalObservable.create(this.CONSTANTS.TOKEN_REFRESH_INTERVAL).subscribe(n => {
        this.refreshToken();
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }

  onCloseAlert(reason: string) {
    let objCloseAlert: AlertMessage = { show: false, message: '', type: ''};
    this.alertService.showAlert(false, null, null);
  }

}
