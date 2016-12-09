export class Person {
  id: number;
  businessId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  personType: string;
  title: string;
  business: string;
  addressId: number;
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
}

export class PersonType {
    static ALL : string = "All";
    static CLIENT : string = "Client";
    static EMPLOYEE : string = "Employee";
    static CANDIDATE : string = "Candidate";
    static PIVOTAL : string = "Pivotal";
    static VENDOR : string = "Vendor";
}