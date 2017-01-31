import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../services/interview.service';
import { Interview } from '../../../models/interview/interview.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {
  interviews;
  constructor(private interviewService: InterviewService, private router: Router) { 
    this.interviews = interviewService.getInterviews();
  }

  ngOnInit() {
    this.getAllInterviews();
  }

  onSelect(interview: Interview) {
    this.router.navigate(['/interviews', interview.id]);
  }
  
  getAllInterviews() {
    this.interviewService.getInterviewsAPI()
    .subscribe(
      data => console.log(JSON.stringify(data)) ,
      error => console.log()
    )
  }
}
