import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../../services/person.service';
import { Person } from '../../../models/person.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']


})

export class PersonListComponent implements OnInit {
  closeResult: string;

  errorMessage: string;
  persons: Person[];
  personTypes: string[] = ['Employee', 'Candidate', 'Client', 'Vendor', 'Pivotal']
  personType: string = 'Employee';

  constructor(private router: Router, private personService: PersonService) { }

  ngOnInit() {
    console.log('Enter: PersonListComponent.ngOnInit()');
    this.personService.getPersons().subscribe(
      persons => {this.persons=persons;
      });
  }

  onSelect(person: Person) {
    this.router.navigate(['/persons', person.id]);
  }

  create() {
    this.router.navigate(['/persons', 0, {personType: this.personType}]);
  }

    createNewPerson() {
    console.log('will call new component');
  }
}
