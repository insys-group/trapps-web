import { RestResource } from '../rest.model';

export class Question extends RestResource {
  id: number;
  question: string;
}
