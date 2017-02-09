import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Interview} from "../models/interview/interview.model";
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";

@Injectable()
export class InterviewService {

  constructor(private restService: RestService) {
  }

  getInterviews(): Observable<Array<Interview>> {
    return this.restService.getAll<Interview>(Locations.INTERVIEW_URL);
  }

  create(interview : Interview){
    return this.restService.create<Interview>(Locations.INTERVIEW_URL, interview);
  }

  getQuestions(): string [] {
    return ['What is swift?', 'How to make NSURLConnection?'];
  }

  getInterviewers(): string [] {
    return ['Rohit', 'Hung'];
  }

}
