import { Address } from '../models/address.model';
import { Business } from '../models/business.model';
import { IResource } from '../resources/crud.resource';

export class Person extends IResource {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  personType: string;
  title: string;
  businessEntity: Business;
  address: Address;
}

export class PersonSkill {
  id: number;
  personId: number;
  name: string
}

export class PersonDocument {
  id: number;
  personId: number;
  name: string;
  fileName: string;
  uploadTimestamp: Date
}

export class PersonType {
    static ALL : string = "All";
    static CLIENT : string = "Client";
    static EMPLOYEE : string = "Employee";
    static CANDIDATE : string = "Candidate";
    static PIVOTAL : string = "Pivotal";
    static VENDOR : string = "Vendor";
}