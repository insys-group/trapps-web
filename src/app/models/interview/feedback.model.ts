import { RestResource } from '../rest.model';
import { Person } from '../person.model';

export class Feedback extends RestResource {
  id: number;
  interviewer: Person;
  comment: string;
}
