import { Injectable } from '@angular/core';

@Injectable()
export class InterviewService {

  constructor() { }

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
