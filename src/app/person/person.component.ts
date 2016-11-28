import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  testVar: string = 'This is Test';
  person: Person = {
      id: 0,
      businessId: 0,
      addressId: 0,
      firstName: 'Muhammad',
      lastName: 'Sabir',
      phone: '6319839075',
      email: 'msabir@insys.com',
      personType: PersonType.CANDIDATE 
  };

  constructor() { 
  }

  ngOnInit() {
    
  }
}

export class Person {
  id: number;
  businessId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  personType: string;
  addressId: number;
}

export class PersonType {
    static EMPLOYEE : string = "Employee";
    static CANDIDATE : string = "Candidate";
    static PIVOTAL : string = "Pivotal";
    static VENDOR : string = "Vendor";
}