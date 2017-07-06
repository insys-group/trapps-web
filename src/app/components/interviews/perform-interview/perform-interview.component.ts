import {Component, OnInit} from '@angular/core';
import {ContactType, Interview} from '../../../models/interview/interview.model';

import {Router, ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../../services/notification.service'
import {InterviewService} from '../../../services/interview.service';
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
import {ConfirmService} from "../../../services/confirm.service";

@Component({
  selector: 'app-interview',
  templateUrl: 'perform-interview.component.html',
  styleUrls: ['perform-interview.component.css']
})

export class PerformInterviewComponent implements OnInit {

  userLoggedIn = LocalStorageService.get('user_info');

  submitted = false;
  interview = new Interview();

  interviewId: number;

  myFeedback: Feedback = new Feedback();
  elseFeedbacks: Feedback[];

  newAnswer: Answer = new Answer();

  person: Person;

  allowEdition: boolean = false;

  showHelp: boolean = false;

  contactTypeCatalog = ContactType;
  contactLabel: string = 'Contact';

  onSubmit() {

  }

  cancel() {
    this.submitted = false;
    this.interview = new Interview();
  }

  constructor(private interviewService: InterviewService, private router: Router, private route: ActivatedRoute,
              private notificationService: NotificationService, private roleService: RoleService,
              private personService: PersonService,
              private loadingService: LoadingService,
              public CONSTANTS: ConstantService,
              private confirmService: ConfirmService) {
    this.route.params.subscribe(params => {
      this.interviewId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.getInterview();
    this.getPerson();
  }

  save(): void {
    this.loadingService.show();
    this.interviewService.save(this.interview)
      .subscribe(
        interview => {
          this.notificationService.success('Interview saved.');
          this.loadingService.hide();
          this.getInterview();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      );
  }

  getInterview() {
    if (this.interviewId) {
      this.loadingService.show();
      this.interviewService.getInterview(this.interviewId)
        .subscribe(
          interview => {

            this.loadingService.hide();
            this.interview = interview;
            this.orderFeedbacks();
            this.checkIfAllowEdition();
            this.onContactTypeChange();

          },
          error => {
            this.loadingService.hide();
            this.notificationService.notifyError(error)
          }
        );
    }
  }

  onContactTypeChange() {
    switch (this.interview.contactType) {
      case ContactType.CANDIDATE_PHONE : {
        this.contactLabel = 'Candidate Phone';
        break;
      }
      case ContactType.CANDIDATE_SKYPE : {
        this.contactLabel = 'Candidate Skype';
        break;
      }
      case ContactType.ZOOM : {
        this.contactLabel = 'Zoom';
        break;
      }
      case ContactType.PHONE :
      default : {
        this.contactLabel = 'Phone';
        break;
      }
    }
  }

  addFeedback() {
    if (!this.interview.feedbacks) {
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

  addQuestion() {
    this.interview.answers.push(this.newAnswer);
    this.save();
    this.newAnswer = new Answer();
  }

  removeQuestion(index: number) {
    this.interview.answers.splice(index, 1);
    this.save();
  }

  getPerson() {
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
    if (this.interview && this.person) {
      this.elseFeedbacks = [];
      this.interview.feedbacks.forEach(feedback => {
        if (this.person.id == feedback.interviewer.id) {
          this.myFeedback = feedback;
        } else {
          this.elseFeedbacks.push(feedback);
        }
      });
    }
  }

  start() {
    let self = this;
    this.confirmService.confirm(
      'Continue?',
      'If you proceed, the basic information of the interview won\'t be editable anymore.',
      function () {
        self.interview.status = self.CONSTANTS.INTERVIEW_STATUS.IN_PROGRESS;
        self.save();
      }
    );
  }

  complete() {
    let self = this;
    this.confirmService.confirm(
      'Continue?',
      'If you proceed, the interview won\'t be editable anymore.',
      function () {
        self.interview.status = self.CONSTANTS.INTERVIEW_STATUS.COMPLETED;
        self.save();
      }
    );
  }

  checkIfAllowEdition() {
    let self = this;
    this.interview.interviewers.forEach(
      function (interviewer) {
        if (self.userLoggedIn.id == interviewer.id) {
          self.allowEdition = true;
        }
      }
    );
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

}
