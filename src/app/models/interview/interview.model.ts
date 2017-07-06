import { RestResource } from '../rest.model';
import { Person } from '../person.model';
import { Question } from './question.model';
import { Feedback } from './feedback.model';
import { Role } from '../role.model';
import {Answer} from "./answer.model";

export class Interview extends RestResource {

  id: number;
  name: string;
  date: Date = new Date();
  contactType: ContactType;
  contact: string;
  status: number;
  candidate: Person;
  role: Role;
  interviewers: Array<Person> = new Array<Person>();
  answers: Array<Answer> = new Array<Answer>();
  feedbacks: Array<Feedback> = new Array<Feedback>();

}

export class ContactType {
  static PHONE : string = "Phone";
  static CANDIDATE_PHONE : string = "CandidatePhone";
  static CANDIDATE_SKYPE : string = "CandidateSkype";
  static ZOOM : string = "Zoom";
}
