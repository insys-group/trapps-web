import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../services/interview.service';
import { Interview } from '../../../models/interview/interview.model';
import { Router } from '@angular/router';
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  interviews;

  constructor(private interviewService: InterviewService, private router: Router,
              private notificationService: NotificationService) {
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
    this.interviewService.getInterviews()
    .subscribe(
      interviews => {
        this.interviews = interviews;
        console.log(this.interviews);
      },
      error => this.notificationService.notifyError(error)
    )
  }

  removeInterview(interview: Interview) {
    this.interviewService.remove(interview)
      .subscribe(
        interviews => {
          console.log(interviews);
        },
        error => this.notificationService.notifyError(error)
      );
    this.getInterviews();
  }

}
