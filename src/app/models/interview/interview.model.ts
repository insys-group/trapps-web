import { RestResource } from '../rest.model';
import { Person } from '../person.model';
import { Question } from './question.model';
import { Feedback } from './feedback.model';
import { Role } from '../role.model';

export class Interview extends RestResource {

  id: number;
  date: number = new Date().getDate();
  phone: string;
  candidate: Person;
  role: Role;
  interviewers: Array<Person> = new Array<Person>();
  questions: Array<Question> = new Array<Question>();
  feedbacks: Array<Feedback> = new Array<Feedback>();

}
