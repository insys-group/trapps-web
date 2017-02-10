import { Component, OnInit } from '@angular/core';
import { Interview } from '../../../models/interview/interview.model';

import {Router, ActivatedRoute} from '@angular/router';
import { NotificationService } from '../../../services/notification.service'
import { InterviewService } from '../../../services/interview.service';
import {RoleService} from "../../../services/role.service";
import {PersonService} from "../../../services/person.service";
import {PersonType, Person} from "../../../models/person.model";

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
  persons;

  interviewId: number;
  newInterviewer: Person;

  candidate_type: string = PersonType.CANDIDATE;
  // INTERVIWER: string = PersonType.EMPLOYEE;

  onSubmit() {

  }

  cancel() {
    this.submitted = false;
    this.interview = new Interview();
  }

  constructor(private interviewService: InterviewService, private router: Router, private route: ActivatedRoute,
              private notificationService: NotificationService, private roleService: RoleService,
              private personService: PersonService) {
    this.route.params.subscribe(params => {
      this.interviewId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.getRoles();
    this.getPersons();
    this.getInterview();
  }

  save(redirect : boolean): void {
    console.log(this.interview);
    this.interviewService.save(this.interview)
      .subscribe(
        interview => {
          if(redirect){
            this.router.navigate(['/interviews']);
          } else {
            this.getInterview();
          }
        },
        error => this.notificationService.notifyError(error)
      )
  }

  getInterview() {
    if(this.interviewId){
      this.interviewService.getInterview(this.interviewId)
        .subscribe(
          interview => {
            this.interview = interview;
            this.autopopulateSelects();
          },
          error => this.notificationService.notifyError(error)
        );
    }
  }

  getRoles() {
    this.roleService.getAll()
      .subscribe(
        roles => {
          this.roles = roles;
          this.autopopulateSelects();
        },
        error => this.notificationService.notifyError(error)
      )
  }

  getPersons() {
    this.personService.getPersons()
      .subscribe(
        persons => {
          this.persons = persons;
          this.autopopulateSelects();
        },
        error => this.notificationService.notifyError(error)
      )
  }

  autopopulateSelects() {
    if(this.roles && this.interview.role){
      this.roles.forEach(role => {
          if(role.id === this.interview.role.id){
            this.interview.role = role
          }
        }
      )
    }
    if(this.persons && this.interview.candidate){
      this.persons.forEach(person => {
          if(person.id === this.interview.candidate.id){
            this.interview.candidate = person
          }
        }
      )
    }
  }

  addInterviewer() {
    this.interview.interviewers.push(this.newInterviewer);
    this.save(false);
  }

  removeInterviewer(index : number) {
    this.interview.interviewers.splice(index, 1);
    this.save(false);
  }

}
