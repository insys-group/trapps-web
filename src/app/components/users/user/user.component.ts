import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {NotificationService} from "../../../services/notification.service";
import {User} from "../../../models/user.model";
import {Person, PersonType} from "../../../models/person.model";
import {PersonService} from "../../../services/person.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private notificationService: NotificationService,
              private personService: PersonService) { }

  user : User = new User();
  userPerson : Person;

  persons: Array<Person>;

  userExists = false;

  EMPLOYEE: string = PersonType.EMPLOYEE;

  ngOnInit() {
    this.getPersons();
  }

  getPersons(){
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

  save(): void {
    this.user.personId = this.userPerson.id;
    this.userService.new(this.user)
      .subscribe(
        user => {
          if(user.username){
            this.userExists = false;
          } else {
            this.userExists = true;
          }
        },
        error => this.notificationService.notifyError(error)
      )
  }

  setUsername(){
    let index = this.userPerson.email.indexOf('@');
    this.user.username = this.userPerson.email.substring(0, index);
  }

}
