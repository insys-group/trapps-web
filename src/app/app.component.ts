import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import {LocalStorageService} from "./services/localstorage.service";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hello Angular with CLI';
  environment = environment;
  userLoggedIn = LocalStorageService.get('user_info');

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {

    console.log(this.userLoggedIn);

  }

  logout(): void {
    this.loginService.logout();
  }

}
