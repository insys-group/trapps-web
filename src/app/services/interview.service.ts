import { Injectable } from '@angular/core';

@Injectable()
export class InterviewService {

  constructor() { }

  getInterviews() : string []{
    return ['iOS Dev', 'Android Dev'];
  } 

}
