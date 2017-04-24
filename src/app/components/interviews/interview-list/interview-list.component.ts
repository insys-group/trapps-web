import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../services/interview.service';
import { Interview } from '../../../models/interview/interview.model';
import { Router } from '@angular/router';
import {NotificationService} from "../../../services/notification.service";
import {LoadingService} from "../../../services/loading.service";
import {ConfirmService} from "../../../services/confirm.service";

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  interviews;

  constructor(private interviewService: InterviewService,
              private router: Router,
              private notificationService: NotificationService,
              private loadingService: LoadingService,
              private confirmService: ConfirmService) {
  }

  ngOnInit() {
    this.getInterviews();
  }

  onSelect(interview: Interview) {
    this.goDetails(interview.id);
  }

  goDetails(id){
    this.router.navigate(['/interviews', id]);
  }

  getInterviews() {
    this.loadingService.show();
    this.interviewService.getInterviews()
      .subscribe(
        interviews => {
          this.loadingService.hide();
          if(interviews[0] && interviews[0].id){
            this.interviews = interviews;
          }
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  removeInterview(interview: Interview) {

    let self = this;
    this.confirmService.confirm(
      'Are you sure you want to remove the interview?',
      '',
      function () {
        self.loadingService.show();
        self.interviewService.remove(interview)
          .subscribe(
            interviews => {
              self.loadingService.hide();
              self.getInterviews();
            },
            error => {
              self.loadingService.hide();
              self.notificationService.notifyError(error)
            }
          );
      }
    );
  }

  perform(interview: Interview) {
    this.router.navigate(['/interviews/perform/', interview.id]);
  }

}
