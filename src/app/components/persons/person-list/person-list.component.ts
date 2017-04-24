import {Component, OnInit, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Person, PersonType} from '../../../models/person.model';
import {Locations} from '../../../models/rest.model';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {NotificationService} from '../../../services/notification.service';
import {RestService} from '../../../services/rest.service';
import {LoadingService} from "../../../services/loading.service";
import {ConfirmService} from "../../../services/confirm.service";
import {PersonService} from "../../../services/person.service";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit {

  persons: Array<Person>;

  personTypes: string[] = [
    PersonType.ALL, PersonType.EMPLOYEE,
    PersonType.CANDIDATE, PersonType.CLIENT,
    PersonType.VENDOR, PersonType.PIVOTAL];

  personType: string = PersonType.ALL;

  select = new EventEmitter();

  constructor(private router: Router,
              private personService: PersonService,
              private notificationService: NotificationService,
              private loadingService: LoadingService,
              private confirmService: ConfirmService) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loadingService.show();
    this.personService.getPersons()
      .subscribe(
        persons => {
          this.loadingService.hide();
          this.persons = persons;
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  onSelect(person: Person) {
    this.router.navigate(['/persons', person.id]);
  }

  create() {
    this.router.navigate(['/persons', 0]);
  }

  remove(person: Person): void {
    let self = this;
    this.confirmService.confirm(
      'Are you sure you want to remove '+person.firstName+'?',
      'All related information to this person will be also deleted.',
      function (){
        self.loadingService.show();
        self.personService.removePerson(person)
          .subscribe(
            persons => {
              self.loadingService.hide();
              self.refresh();
            },
            error => {
              self.loadingService.hide();
              self.notificationService.notifyError(error)
            }
          );
      }
    );
  }

}
