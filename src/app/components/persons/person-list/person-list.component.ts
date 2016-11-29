import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { Person } from '../../../models/person.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit {

  errorMessage: string;
  persons: Person[];

  constructor(private personService: PersonService) { }

  getPersons() {
    this.personService.getPersons()
    .subscribe(
      persons => this.persons = persons,
      error => this.errorMessage = error
    );
  }
  ngOnInit() {
    this.getPersons();
  }
}
