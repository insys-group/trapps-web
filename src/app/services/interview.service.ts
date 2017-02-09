import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injector } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InterviewService {

  constructor (private http: Http) { }

  getInterviewsAPI(): Observable<any>{
      return this.http.get("http://localhost:8081/api/v1/interviews/0/interviewers")
                .map((res: Response) => res.json())
                .catch((error:any) => Observable.throw(error.json().error || ' Server error '));
  }

  getInterviews() : string []{
    return ['iOS Dev', 'Android Dev'];
  } 

    getQuestions() : string []{
    return ['What is swift?', 'How to make NSURLConnection?'];
  } 

    getInterviewers() : string []{
    return ['Rohit', 'Hung'];
  } 

}
