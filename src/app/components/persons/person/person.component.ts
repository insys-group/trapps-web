import { Component, OnInit } from '@angular/core';
import { Person, PersonType } from '../../../models/person.model';
import { PersonService } from '../../../services/person.service';
import { NotificationService } from '../../../services/notification.service'
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {
  person: Person = new Person();
  personTypes: string[] = ['Employee', 'Candidate', 'Client', 'Vendor', 'Pivotal'];
  businesses: string[] = ['Comcast', 'Aptium', 'Pivotal', 'INSYS Group'];

  skills: boolean;
  documents: boolean;

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    console.log(`Enter: PersonComponent.ngOnInit()`);
    let id = 0;
    let personType = '';
    this.route.params.subscribe(params => {
      id = +params['id'];
      personType=params['personType'];
      console.log(`Parameter Id is ${id}`);
      if (id > 0) {
        this.personService.getPerson(id)
          .subscribe(
            person => {this.person = person; this.init();},
            error => this.handleError
          );
      } else {
        this.person.id=0;
        if(personType!='') {
          this.person.personType=personType;
        } else {
          this.person.personType='Employee';
        }
        this.init();
      }
    });
  }

  private init(): void {
    if(this.person.personType==='Employee' || this.person.personType==='Candidate') {
      this.personTypes = ['Employee', 'Candidate'];
      this.businesses = ['INSYS Group'];
      this.person.business='INSYS Group';
      this.skills=true;
      this.documents=true;
    } else {
      this.personTypes = [this.person.personType];
      this.skills=false;
      this.documents=false;
    }
  }

  save(): void {
    console.log('Enter: PersonComponent.save()' + this.person.id);
    
    if(this.person.id===0) {
      this.personService.createPerson(this.person).subscribe(person => this.handleSuccess(person), this.handleError);
    } else {
      this.personService.updatePerson(this.person).subscribe(person => this.handleSuccess(person), this.handleError);
    }
  }

  delete(): void {
    console.log('Enter: PersonComponent.delete()');
    this.notificationService.ask('Do you really want to delete?', ["Yes", "No"])
      .subscribe(
        result => {
          if(result==='Yes') {
            this.personService.deletePerson(this.person.id).subscribe(() => this.router.navigate(['/persons']), this.handleError);
          } else {
            console.log('Dont want to delete the record');
          }
        },
        () => null
      );
  }

  cancel(): void {
    this.location.back();
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }

  private handleSuccess(person: Person): void {
    this.person=person;
    this.notificationService.info('Data saved successfully');
  }
}