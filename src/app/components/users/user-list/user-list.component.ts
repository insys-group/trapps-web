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

  persons: Array<Person>;

  constructor(private router: Router,
              private userService: UserService,
              private personService: PersonService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.personService.getPersons()
      .subscribe(
        persons => {
          if(persons[0] && persons[0].id){
            this.persons = persons;
            console.log(this.persons);
          }
        },
        error => this.notificationService.notifyError(error)
      )
  }

  goDetails(username){
    this.router.navigate(['/users', username]);
  }

}
