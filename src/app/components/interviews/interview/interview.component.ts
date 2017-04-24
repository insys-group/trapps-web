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
import {InterviewTemplate} from "../../../models/interview/interview.template.model";
import {Answer} from "../../../models/interview/answer.model";
import {LocalStorageService} from "../../../services/local.storage.service";
import {LoadingService} from "../../../services/loading.service";
import {ConstantService} from "../../../services/constant.service";

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})

export class InterviewComponent implements OnInit {

  userLoggedIn = LocalStorageService.get('user_info');

  submitted = false;
  interview = new Interview();

  roles;
  persons;

  interviewId: number;
  newInterviewer: Person;

  myFeedback: Feedback = new Feedback();
  elseFeedbacks: Feedback[];

  CANDIDATE: string = PersonType.CANDIDATE;
  INTERVIWER: string = PersonType.EMPLOYEE;

  templates;
  selectedTemplate: InterviewTemplate = new InterviewTemplate();
  questions;

  newAnswer: Answer = new Answer();

  person: Person;

  onSubmit() {

  }

  cancel() {
    this.submitted = false;
    this.interview = new Interview();
  }

  constructor(private interviewService: InterviewService, private router: Router, private route: ActivatedRoute,
              private notificationService: NotificationService, private roleService: RoleService,
              private personService: PersonService,
              public CONSTANTS: ConstantService,
              private loadingService: LoadingService) {
    this.route.params.subscribe(params => {
      this.interviewId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.getRoles();
    this.getPersons();
    this.getInterview();
    this.getTemplates();
    this.getPerson();
  }

  save(): void {
    this.interview.status = this.CONSTANTS.INTERVIEW_STATUS.OPEN;
    this.loadingService.show();
    this.interviewService.save(this.interview)
      .subscribe(
        interview => {
          this.notificationService.success('Interview saved.');
          this.loadingService.hide();
          this.router.navigate(['/interviews', interview.id]);
          this.interviewId = + interview.id;
          this.getInterview();
          this.questions = [];
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  getInterview() {
    if(this.interviewId){
      this.loadingService.show();
      this.interviewService.getInterview(this.interviewId)
        .subscribe(
          interview => {

            this.loadingService.hide();
            this.interview = interview;
            this.autopopulateRole();
            this.autopopulateCandidate();
            this.orderFeedbacks();

          },
          error => {
            this.loadingService.hide();
            this.notificationService.notifyError(error)
          }
        );
    }
  }

  getRoles() {
    this.loadingService.show();
    this.roleService.getAll()
      .subscribe(
        roles => {
          this.loadingService.hide();
          this.roles = roles;
          this.autopopulateRole();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  getPersons() {
    this.loadingService.show();
    this.personService.getPersons()
      .subscribe(
        persons => {
          this.loadingService.hide();
          this.persons = persons;
          this.autopopulateCandidate();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  autopopulateRole() {
    if(this.roles && this.interview.role){
      this.roles.forEach(role => {
          if(role.id === this.interview.role.id){
            this.interview.role = role;
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

  addFeedback() {
    if(!this.interview.feedbacks){
      this.interview.feedbacks = [];
    }
    this.myFeedback.interviewer = this.person;
    this.interview.feedbacks.push(this.myFeedback);
    this.save();
  }

  updateFeedback() {
    this.loadingService.show();
    this.interviewService.updateFeedback(this.myFeedback)
      .subscribe(
        response => {
          this.loadingService.hide();
          this.getInterview();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  getTemplates() {
    this.loadingService.show();
    this.interviewService.getTemplates()
      .subscribe(
        templates => {
          this.loadingService.hide();
          this.templates = templates;
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  getTemplate() {
    this.loadingService.show();
    this.interviewService.getTemplate(this.selectedTemplate.id)
      .subscribe(
        template => {

          this.loadingService.hide();
          this.questions = template.questions;
          this.questions.forEach(question => {
            question.selected = true;
            }
          )

        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      );
  }

  assignQuestions() {
    this.questions.forEach(question => {
      if(question.selected){
        let answer = new Answer();
        answer.question = question;
        this.interview.answers.push(answer);
      }
    });
    this.save();
  }

  addQuestion() {
    this.interview.answers.push(this.newAnswer);
    this.save();
    this.newAnswer = new Answer();
  }

  removeQuestion(index : number) {
    this.interview.answers.splice(index, 1);
    this.save();
  }

  getPerson(){
    this.loadingService.show();
    this.personService.getPerson(this.userLoggedIn.id)
      .subscribe(
        person => {
          this.loadingService.hide();
          this.person = person;
          this.orderFeedbacks();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      );
  }

  orderFeedbacks() {
    if(this.interview && this.person){
      this.elseFeedbacks = [];
      this.interview.feedbacks.forEach(feedback => {
        if(this.person.id == feedback.interviewer.id){
          this.myFeedback = feedback;
        } else {
          this.elseFeedbacks.push(feedback);
        }
      });
    }
  }

}
