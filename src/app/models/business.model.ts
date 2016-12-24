import { IResource } from '../resources/crud.resource';
import { Address } from '../models/address.model';

export class Business extends IResource {
  id: number;
  name: string;
  description: string;
  businessType: string;
  addresses: Address[];
}

export class BusinessType {
  static ALL: string = "All";
  static CLIENT: string = "Client";
  static PLABS: string = "PivotalLabs";
  static PIVOTAL: string = "Pivotal";
  static VENDOR: string = "Vendor";
  static INSYS: string = "INSYS";
}