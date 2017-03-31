import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../services/interview.service';
import { Interview } from '../../../models/interview/interview.model';
import { Router } from '@angular/router';
import {NotificationService} from "../../../services/notification.service";
import {InterviewTemplate} from "../../../models/interview/interview.template.model";
import {LoadingService} from "../../../services/loading.service";

@Component({
  selector: 'app-interview-template-list',
  templateUrl: 'interview-template-list.component.html',
  styleUrls: ['interview-template-list.component.css']
})
export class InterviewTemplateListComponent implements OnInit {

  templates;

  constructor(private interviewService: InterviewService,
              private router: Router,
              private notificationService: NotificationService,
              private loadingService: LoadingService) {
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
    this.loadingService.show();
    this.interviewService.getTemplates()
    .subscribe(
      templates => {
        this.loadingService.hide();
        if(templates[0] && templates[0].id){
          this.templates = templates;
          console.log(this.templates);
        }
      },
      error => {
        this.loadingService.hide();
        this.notificationService.notifyError(error)
      }
    )
  }

  removeInterview(template: InterviewTemplate) {
    this.loadingService.show();
    this.interviewService.removeTemplate(template)
      .subscribe(
        templates => {
          this.loadingService.hide();
          console.log(templates);
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      );
    this.getTemplates();
  }

}
