import { RestResource } from '../rest.model';

export class OpportunityStep extends RestResource {

  id: number;
  comments: string;
  stepTimestamp: Date = new Date();

}
