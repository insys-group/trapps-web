import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../services/interview.service';
import { Interview } from '../../../models/interview/interview.model';
import { Router } from '@angular/router';
import {NotificationService} from "../../../services/notification.service";
import {LoadingService} from "../../../services/loading.service";

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
              private loadingService: LoadingService) {
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
    this.loadingService.show();
    this.interviewService.remove(interview)
      .subscribe(
        interviews => {
          this.loadingService.hide();
          console.log(interviews);
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      );
    this.getInterviews();
  }

}
