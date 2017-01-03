//import { Address } from './address.model';
//import { Business } from './business.model';
import { RestResource } from './rest.model';
import { Observable } from 'rxjs/Observable';

export class State extends RestResource {
  id: number;
  stateCode: string;
  //version: number;
}