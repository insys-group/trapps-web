import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Person, PersonType } from '../../../models/person.model';
import { Locations } from '../../../models/rest.model';
import { environment } from '../../../../environments/environment';import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../../services/notification.service';
import { RestService } from '../../../services/rest.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit {

  closeResult: string;

  errorMessage: string;

  persons: Array<Person>;

  personTypes: string[] = [PersonType.ALL, PersonType.EMPLOYEE,
                          PersonType.CANDIDATE, PersonType.CLIENT,
                          PersonType.VENDOR, PersonType.PIVOTAL]

  personType: string = PersonType.EMPLOYEE;

  select = new EventEmitter();

  constructor(private router: Router, private restService: RestService, private notificationService: NotificationService) { }

  ngOnInit() {
    console.log('Enter: PersonListComponent.ngOnInit()');
    this.restService.getAll<Person>(Locations.PERSON_URL).subscribe(
      persons => this.persons = persons,
      error => this.notificationService.notifyError(error)
    );

    this.select.emit(this.personTypes[0]);
  }

  onSelect(person: Person) {
    this.router.navigate(['/persons', person.id]);
  }

  create() {
    this.router.navigate(['/persons', 0, { personType: this.personType }]);
  }

}
