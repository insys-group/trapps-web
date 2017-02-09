import { Component, OnInit } from '@angular/core';

import { Interview } from '../../../models/interview/interview.model';
import { Question } from '../../../models/interview/question.model';
import { Feedback } from '../../../models/interview/feedback.model';
import { Roles } from '../../../models/role.model';
import { Person } from '../../../models/person.model';

import { PersonComponent } from '../../persons/person/person.component';
import { PersonListComponent } from '../../persons/person-list/person-list.component';
import { RoleComponent } from '../../roles/role/role.component';

import { RestService } from '../../../services/rest.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service'
import { ViewChild, ContentChildren, ContentChild } from '@angular/core';
import { InterviewService } from '../../../services/interview.service';
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})

export class InterviewComponent implements OnInit {

  questions: string[] = [];
  interviewerss: string[] = [];
  interviewerName: string;
  question: string;

  submitted = false;
  interview = new Interview();

  roles;

  onSubmit() {
    this.submitted = true;
  }

  cancel() {
    this.submitted = false
    this.interview = new Interview();
  }

  id: number;

  @ViewChild(RoleComponent)
  private role: RoleComponent;

  @ViewChild(PersonComponent)
  private candidate: PersonComponent;

  @ViewChild(PersonListComponent)
  private interviewers: PersonListComponent;

  constructor(private interviewService: InterviewService, private router: Router,
              private notificationService: NotificationService, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getRoles();
  }

  save(): void {
    console.log(this.interview);
    this.interviewService.create(this.interview)
      .subscribe(
        interview => {
          console.log(interview);
          this.interview = interview;
          this.router.navigate(['/interviews']);
        },
        error => this.notificationService.notifyError(error)
      )
  }

  getRoles() {
    this.roleService.getAll()
      .subscribe(
        roles => {
          console.log(roles);
          this.roles = roles
        },
        error => this.notificationService.notifyError(error)
      )
  }

}
