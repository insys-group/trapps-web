import { Address } from './address.model';
import { Business } from './business.model';
import { RestResource } from './rest.model';
import { Observable } from 'rxjs/Observable';

export class Person extends RestResource {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  personType: string;
  title: string;
  business: Business;
  address: Address;
}

export class PersonSkill extends RestResource {
  id: number;
  person: Person;
  name: string;
  scale: number;
}

export class PersonDocument extends RestResource {
  id: number;
  person: Person;
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

export interface ChildViewComponent {
  loadDataAsync<T>(url: string): Observable<T>;
  isSaveReady(): boolean;
  saveAsync<T>(): Observable<T>;
  save(): void;
}