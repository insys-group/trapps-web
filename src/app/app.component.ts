import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import {LocalStorageService} from "./services/localstorage.service";
import {LoginService} from "./services/login.service";
import {LoadingService} from "./services/loading.service";
import {AlertService, AlertMessage} from "./services/alert.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Trapps';
  environment = environment;
  userLoggedIn = LocalStorageService.get('user_info');

  objAlert: AlertMessage;

  constructor(private router: Router,
              private loginService: LoginService,
              private loadingService: LoadingService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    console.debug(this.userLoggedIn);
    this.alertService.alertStatus.subscribe((val: AlertMessage) => {
      this.objAlert = { show: val.show, message: val.message, type: val.type };
    });
  }

  logout(): void {
    this.loginService.logout();
  }

  onCloseAlert(reason: string) {
    let objCloseAlert: AlertMessage = { show: false, message: '', type: ''};
    this.alertService.showAlert(false, null, null);
  }

}
