import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/local.storage.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLoggedIn = LocalStorageService.get('user_info');

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  }

}
