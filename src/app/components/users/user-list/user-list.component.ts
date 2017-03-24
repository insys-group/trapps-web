import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import {Person} from "../../../models/person.model";
import {NotificationService} from "../../../services/notification.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<User>;

  constructor(private router: Router, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe(
        users => {
          if(users[0] && users[0].username){
            this.users = users;
            console.log(this.users);
          }
        },
        error => this.notificationService.notifyError(error)
      )
  }

  goDetails(username){
    this.router.navigate(['/users', username]);
  }

}
