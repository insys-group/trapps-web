import { RestResource } from '../rest.model';
import { Person } from '../person.model';
import { Question } from './question.model';
import { Feedback } from './feedback.model';
import { Role } from '../role.model';

export class InterviewTemplate extends RestResource {

  id: number;
  name: string;
  date: Date = new Date();
  role: Role;
  questions: Array<Question> = new Array<Question>();

}
