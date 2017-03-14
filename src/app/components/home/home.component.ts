import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/localstorage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLoggedIn = LocalStorageService.get('user_info');

  constructor() { }

  ngOnInit() {
  }

}
