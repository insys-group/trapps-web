import { RestResource } from '../rest.model';
import {OpportunityStep} from "./opportunity.step.model";
import {Engagement} from "./engagement.model";
import {Business} from "../business.model";
import {Person} from "../person.model";

export class Opportunity extends RestResource {

  id: number;
  name: string;
  comments: string;
  business: Business;
  person: Person;
  opportunitySteps: Array<OpportunityStep> = new Array<OpportunityStep>();
  engagements: Array<Engagement> = new Array<Engagement>();

}
