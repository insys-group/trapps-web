import { IResource } from '../resources/crud.resource';

export class Business extends IResource {
  id: number;
  name: string;
  description: string;
  entityType: string;
}

export class BusinessType {
  static ALL: string = "All";
  static CLIENT: string = "Client";
  static PLABS: string = "Pivotal-Labs";
  static PIVOTAL: string = "Pivotal";
  static VENDOR: string = "Vendor";
  static INSYS: string = "Insys";
}
