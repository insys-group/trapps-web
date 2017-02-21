import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../services/interview.service';
import { Interview } from '../../../models/interview/interview.model';
import { Router } from '@angular/router';
import {NotificationService} from "../../../services/notification.service";
import {InterviewTemplate} from "../../../models/interview/interview.template.model";

@Component({
  selector: 'app-interview-template-list',
  templateUrl: 'interview-template-list.component.html',
  styleUrls: ['interview-template-list.component.css']
})
export class InterviewTemplateListComponent implements OnInit {

  templates;

  constructor(private interviewService: InterviewService, private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getTemplates();
  }

  onSelect(template: Interview) {
    this.goDetails(template.id);
  }

  goDetails(id){
    this.router.navigate(['/interview-templates', id]);
  }

  getTemplates() {
    this.interviewService.getTemplates()
    .subscribe(
      templates => {
        this.templates = templates;
        console.log(this.templates);
      },
      error => this.notificationService.notifyError(error)
    )
  }

  removeInterview(template: InterviewTemplate) {
    this.interviewService.removeTemplate(template)
      .subscribe(
        templates => {
          console.log(templates);
        },
        error => this.notificationService.notifyError(error)
      );
    this.getTemplates();
  }

}
