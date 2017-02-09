import { RestResource } from '../rest.model';
import { Person } from '../person.model';
import { Question } from './question.model';
import { Feedback } from './feedback.model';
import { Roles } from '../roles.model';

export class Interview  {
  constructor ( public id: number, public interviewName: string, public candidateName: string, public phoneNumber: number, public role: string,  public feedback: string ) {

  }
  // id: number;
  // date: number;
  // phone: string;
  // candidate: Person;
  // role: Roles;
  // interviewers: Array<Person> = new Array<Person>();
  // questions: Array<Question> = new Array<Question>();
  // feedback: Feedback;
}
