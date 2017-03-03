import { RestResource } from './rest.model';
import { Address } from './address.model';
import { Observable } from 'rxjs/Observable';

export class Business extends RestResource {
  id: number;
  name: string;
  description: string;
  businessType: string;
  //version: number;
  addresses: Address[];
}

export class BusinessType extends RestResource{
  static ALL: string = "All";
  static CLIENT: string = "Client";
  static PLABS: string = "PivotalLabs";
  static PIVOTAL: string = "Pivotal";
  static VENDOR: string = "Vendor";
  static INSYS: string = "INSYS";
}
