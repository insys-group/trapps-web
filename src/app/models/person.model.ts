import { Address } from './address.model';
import { Business } from './business.model';
import { RestResource } from './rest.model';

export class Person extends RestResource {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  personType: string;
  title: string;
  //version: number;
  business: Business = new Business();
  address: Address = new Address();
  personDocuments: Array<PersonDocument> = new Array<PersonDocument>();
  personSkills: Array<PersonSkill>=new Array<PersonSkill>();
}

export class PersonSkill extends RestResource {
  id: number;
  name: string;
  scale: number;
}

export class PersonDocument extends RestResource {
  id: number;
  fileName: string;
  uploadTimestamp: Date;
  downloadLink: string
}

export class PersonType {
    static ALL : string = "All";
    static CLIENT : string = "Client";
    static EMPLOYEE : string = "Employee";
    static CANDIDATE : string = "Candidate";
    static PIVOTAL : string = "Pivotal";
    static PLABS : string = "Pivotal-Labs";
    static VENDOR : string = "Vendor";
}