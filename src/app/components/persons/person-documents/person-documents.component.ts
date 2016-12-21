import { Component, Input, OnInit } from '@angular/core';
import { Person, PersonDocument } from '../../../models/person.model';
import { PersonService } from '../../../services/person.service';
import { NotificationService } from '../../../services/notification.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-person-documents',
  templateUrl: './person-documents.component.html',
  styleUrls: ['./person-documents.component.css']
})

export class PersonDocumentsComponent implements OnInit {
  constructor(private personService: PersonService, private notificationService: NotificationService) { }
  @Input()
  person: Person;

  documentName: string;

  ngOnInit() {
  }

  uploadDocument(): void {
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }

}
