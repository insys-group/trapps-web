import { Component, OnInit } from '@angular/core';

import { Interview } from '../../../models/interview/interview.model';

import { PersonComponent } from '../../persons/person/person.component';
import { PersonListComponent } from '../../persons/person-list/person-list.component';
import { RoleComponent } from '../../roles/role/role.component';

import {Router, ActivatedRoute} from '@angular/router';
import { NotificationService } from '../../../services/notification.service'
import { ViewChild, ContentChildren, ContentChild } from '@angular/core';
import { InterviewService } from '../../../services/interview.service';
import {RoleService} from "../../../services/role.service";
import {Role} from "../../../models/role.model";

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

  }

  cancel() {
    this.submitted = false;
    this.interview = new Interview();
  }

  interviewId: number;

  constructor(private interviewService: InterviewService, private router: Router, private route: ActivatedRoute,
              private notificationService: NotificationService, private roleService: RoleService) {
    this.route.params.subscribe(params => {
      this.interviewId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.getRoles();

  }

  save(): void {
    console.log(this.interview);
    this.interviewService.save(this.interview)
      .subscribe(
        interview => {
          console.log(interview);
          this.interview = interview;
          this.router.navigate(['/interviews']);
        },
        error => this.notificationService.notifyError(error)
      )
  }

  getInterview() {
    if(this.interviewId){
      this.interviewService.getInterview(this.interviewId)
        .subscribe(
          interview => {
            console.log(interview);
            this.interview = interview;
            this.roles.forEach(role => {
              if(role.id === this.interview.role.id){
                this.interview.role = role
              }
              }
            )
          },
          error => this.notificationService.notifyError(error)
        );
    }
  }

  getRoles() {
    this.roleService.getAll()
      .subscribe(
        roles => {
          console.log(roles);
          this.roles = roles;
          this.getInterview();
        },
        error => this.notificationService.notifyError(error)
      )
  }

}
