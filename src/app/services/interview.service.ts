import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Interview} from "../models/interview/interview.model";
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";
import {Role} from "../models/role.model";
import {Person} from "../models/person.model";
import {Question} from "../models/interview/question.model";
import {Feedback} from "../models/interview/feedback.model";
import {InterviewTemplate} from "../models/interview/interview.template.model";

@Injectable()
export class InterviewService {

  constructor(private restService: RestService) {
  }

  getInterviews(): Observable<Array<Interview>> {
    return this.restService.getAll<Interview>(Locations.INTERVIEW_URL);
  }

  getInterview(id : number): Observable<Interview> {
    return this.restService.getOne<Interview>(Locations.INTERVIEW_DETAILS_URL+id);
  }

  save(interview : Interview){
    return this.restService.create<Interview>(Locations.INTERVIEW_URL, interview);
  }

  remove(interview : Interview){
    return this.restService.delete(interview);
  }

  updateFeedback(feedback : Feedback){
    return this.restService.put(Locations.FEEDBACK_URL, feedback);
  }

  getTemplates(): Observable<Array<InterviewTemplate>> {
    return this.restService.getAll<InterviewTemplate>(Locations.INTERVIEW_TEMPLATE_URL);
  }

  getTemplate(id : number): Observable<InterviewTemplate> {
    return this.restService.getOne<InterviewTemplate>(Locations.INTERVIEW_TEMPLATE_URL+id);
  }

  saveTemplate(template : InterviewTemplate){
    return this.restService.create<InterviewTemplate>(Locations.INTERVIEW_TEMPLATE_URL, template);
  }

  removeTemplate(template : InterviewTemplate){
    return this.restService.delete(template);
  }

}
