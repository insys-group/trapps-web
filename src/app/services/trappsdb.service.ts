
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

    let businesses = [
      {
        "id": 30,
        "name": "Pivotal-Labs",
        "description": "Pivotal-Labs for trainging and R&D",
        "addresses": "pivtoal-lab street",
        "businessType": "Pivotal-Labs"
      },
      {
         "id": 31,
        "name": "Client",
        "description": "Business for CF and Spring",
        "addresses": "client 1 street",
        "businessType": "Client"
      },
      {
         "id": 32,
        "name": "Pivotal",
        "description": "Business Partners for Technologies",
        "addresses": "pivotal 1 street",
        "businessType": "Pivotal"
      },
      {
        "id": 33,
        "name": "Vendor",
        "description": "Business Vednors for Technologies",
        "addresses": "vendor 1 street",
        "businessType": "Vendor"
      },
      {
        "id": 34,
        "name": "Insys",
        "description": "Insys group for Technologies",
        "addresses": "isnys 1 street",
        "businessType": "Insys"
      }
    ];

    return { "addresses": addresses, "persons": persons, "businesses": businesses, "personskills": personSkills };
  }
}
