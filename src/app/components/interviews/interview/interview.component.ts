import { Component, OnInit } from '@angular/core';

import { Interview } from '../../../models/interview/interview.model';
import { Question } from '../../../models/interview/question.model';
import { Feedback } from '../../../models/interview/feedback.model';
import { Roles } from '../../../models/roles.model';
import { Person } from '../../../models/person.model';

import { PersonComponent } from '../../persons/person/person.component';
import { PersonListComponent } from '../../persons/person-list/person-list.component';
import { RoleComponent } from '../../roles/role/role.component';

import { RestService } from '../../../services/rest.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service'
import { ViewChild, ContentChildren, ContentChild } from '@angular/core';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})

export class InterviewComponent implements OnInit {
  id: number;
  interview: Interview = new Interview();

  // lookups
  date: Date = new Date();

  @ViewChild(RoleComponent)
  private role: RoleComponent;

  @ViewChild(PersonComponent)
  private candidate: PersonComponent;

  @ViewChild(PersonListComponent)
  private interviewers: PersonListComponent;

  constructor() {

  }

  ngOnInit(): void {

  }

  private initDefaults(): void {
    // default display options in the html
  }

  save(): void {

  }

  delete(): void {

  }

  cancel(): void {

  }

  onChange(): void {

  }
}
