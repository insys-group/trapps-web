
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TrappsInMemoryDbService implements InMemoryDbService {
  createDb() {
      console.log('InMemoryAddressService() *************' + Date.now());
    let addresses = [
      {
            "id": 130,
            "address_1": "343 Derass rd",
            "address_2": "",
            "city": "NY",
            "state": "NY",
            "zip_code": "34545"
        },
        {
            "id": 131,
            "address_1": "33 Fgrr rd",
            "address_2": "",
            "city": "Paramus",
            "state": "NJ",
            "zip_code": "367676"
        },
        {
            "id": 132,
            "address_1": "232 Cddss rd",
            "address_2": "",
            "city": "Wsedr",
            "state": "NJ",
            "zip_code": "78997"
        }
    ];

    let persons = [
      {
        "id": 30,
        "firstName": "Muhammad",
        "lastName": "Sabir",
        "phone": "631-983-9075",
        "email": "msabir@insys.com",
        "personType": "Employee",
        "business": "INSYS Group",
        "title": "Architect"
      },
      {
        "id": 31,
        "firstName": "Kris",
        "lastName": "Krishna",
        "phone": "203-456-7890",
        "email": "kshitiz@insys.com",
        "personType": "Employee",
        "business": "INSYS Group",
        "title": "Architect"
      },
      {
        "id": 32,
        "firstName": "Christopher",
        "lastName": "Umbel",
        "phone": "203-456-7890",
        "email": "cumbel@pivotal.io",
        "personType": "Pivotal",
        "business": "Pivotal",
        "title": "Architect"
      },
      {
        "id": 33,
        "firstName": "Michael",
        "lastName": "Forte",
        "phone": "203-456-7890",
        "email": "mforte@accenture.com",
        "personType": "Vendor",
        "business": "Aptium",
        "title": "Manager"
      },
      {
        "id": 34,
        "firstName": "Werner",
        "lastName": "Vogels",
        "phone": "203-456-7890",
        "email": "mforte@comcast.com",
        "personType": "Client",
        "business": "Comcast",
        "title": "Manager"
      }
    ];
    let personSkills = [
      {
        "id": 10,
        "personId": 30,
        "name": "Spring"
      },
      {
        "id": 11,
        "personId": 30,
        "name": "JPA"
      },
      {
        "id": 12,
        "personId": 30,
        "name": "Angular"
      },
      {
        "id": 13,
        "personId": 31,
        "name": "Spring"
      },
      {
        "id": 14,
        "personId": 31,
        "name": "JPA"
      },
      {
        "id": 15,
        "personId": 31,
        "name": "Angular"
      }
    ];
    return { "addresses": addresses, "persons": persons, "personskills": personSkills };
  }
}