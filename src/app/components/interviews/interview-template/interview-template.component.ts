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

@Component({
  selector: 'app-interview-template',
  templateUrl: 'interview-template.component.html',
  styleUrls: ['interview-template.component.css']
})

export class InterviewTemplateComponent implements OnInit {

  questions: string[] = [];
  question: string;

  submitted = false;
  template = new InterviewTemplate();

  roles;
  persons;

  templateId: number;
  newQuestion: Question = new Question();

  onSubmit() {

  }

  cancel() {
    this.submitted = false;
    this.template = new InterviewTemplate();
  }

  constructor(private interviewService: InterviewService, private router: Router, private route: ActivatedRoute,
              private notificationService: NotificationService, private roleService: RoleService,
              private personService: PersonService) {
    this.route.params.subscribe(params => {
      this.templateId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.getRoles();
    this.getTemplate();
  }

  save(): void {
    // console.log(this.template);
    this.interviewService.saveTemplate(this.template)
      .subscribe(
        template => {
          this.router.navigate(['/interview-templates', template.id]);
          this.templateId = + template.id;
          this.getTemplate();
        },
        error => this.notificationService.notifyError(error)
      )
  }

  getTemplate() {
    if(this.templateId){
      this.interviewService.getTemplate(this.templateId)
        .subscribe(
          template => {

            this.template = template;
            console.log(this.template);
            this.autopopulateRole();

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

  autopopulateRole() {
    if(this.roles && this.template.role){
      this.roles.forEach(role => {
          if(role.id === this.template.role.id){
            this.template.role = role;
          }
        }
      )
    }
  }

  addQuestion() {
    if(!this.template.questions){
      this.template.questions = [];
    }
    this.template.questions.push(this.newQuestion);
    this.save();
    this.newQuestion = new Question();
  }

  removeQuestion(index : number) {
    this.template.questions.splice(index, 1);
    this.save();
  }

}
