import { RestResource } from '../rest.model';
import { Person } from '../person.model';
import { Question } from './question.model';
import { Feedback } from './feedback.model';
import { Role } from '../role.model';
import {Answer} from "./answer.model";

export class Interview extends RestResource {

  id: number;
  date: Date = new Date();
  name: string;
  phone: string;
  candidate: Person;
  role: Role;
  interviewers: Array<Person> = new Array<Person>();
  answers: Array<Answer> = new Array<Answer>();
  feedbacks: Array<Feedback> = new Array<Feedback>();

}
