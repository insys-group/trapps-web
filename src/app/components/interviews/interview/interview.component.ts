import { Component, OnInit } from '@angular/core';
import { Interview } from '../../../models/interview/interview.model';

import {Router, ActivatedRoute} from '@angular/router';
import { NotificationService } from '../../../services/notification.service'
import { InterviewService } from '../../../services/interview.service';
import {RoleService} from "../../../services/role.service";
import {PersonService} from "../../../services/person.service";
import {PersonType, Person} from "../../../models/person.model";
import {Question} from "../../../models/interview/question.model";
import {Feedback} from "../../../models/interview/feedback.model";

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
  newQuestion: Question = new Question();
  newFeedback: Feedback = new Feedback();

  CANDIDATE: string = PersonType.CANDIDATE;
  INTERVIWER: string = PersonType.EMPLOYEE;

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

  save(): void {
    console.log(this.interview);
    this.interviewService.save(this.interview)
      .subscribe(
        interview => {
          this.getInterview();
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
            console.log(this.interview);
            this.autopopulateRole();
            this.autopopulateCandidate();

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
          // console.log(this.roles);
          this.autopopulateRole();
        },
        error => this.notificationService.notifyError(error)
      )
  }

  getPersons() {
    this.personService.getPersons()
      .subscribe(
        persons => {
          this.persons = persons;
          // console.log(this.persons);
          this.autopopulateCandidate();
        },
        error => this.notificationService.notifyError(error)
      )
  }

  autopopulateRole() {
    if(this.roles && this.interview.role){
      this.roles.forEach(role => {
          if(role.id === this.interview.role.id){
            this.interview.role = role;
            // console.log(2, this.interview);
          }
        }
      )
    }
  }

  autopopulateCandidate() {
    if(this.persons && this.interview.candidate){
      this.persons.forEach(person => {
          if(person.id === this.interview.candidate.id){
            this.interview.candidate = person;
            // console.log(2, this.interview);
          }
        }
      )
    }
  }

  addInterviewer() {
    if(!this.interview.interviewers){
      this.interview.interviewers = [];
    }
    this.interview.interviewers.push(this.newInterviewer);
    this.save();
  }

  removeInterviewer(index : number) {
    this.interview.interviewers.splice(index, 1);
    this.save();
  }

  addQuestion() {
    if(!this.interview.questions){
      this.interview.questions = [];
    }
    this.interview.questions.push(this.newQuestion);
    this.save();
  }

  removeQuestion(index : number) {
    this.interview.questions.splice(index, 1);
    this.save();
  }

  addFeedback() {
    let addIt = true;
    if(!this.interview.feedbacks){
      this.interview.feedbacks = [];
    } else {
      this.interview.feedbacks.forEach(feedback => {
          if(feedback.interviewer.id === this.newFeedback.interviewer.id){
            addIt = false;
          }
        }
      )
    }
    if(addIt){
      this.interview.feedbacks.push(this.newFeedback);
      this.save();
    }else {
      console.log('Interviewer already exists.');
    }
  }

  updateFeedback(feedback) {
    this.interviewService.updateFeedback(feedback)
      .subscribe(
        response => {
          this.getInterview();
        },
        error => this.notificationService.notifyError(error)
      )
  }

  removeFeedback(index : number) {
    this.interview.feedbacks.splice(index, 1);
    this.save();
  }

}
