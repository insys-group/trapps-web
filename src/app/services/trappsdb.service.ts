
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TrappsInMemoryDbService implements InMemoryDbService {
  createDb() {
      console.log('InMemoryAddressService() *************' + Date.now());
    let addresses = [
      {
            "id": 130,
            "address1": "343 Derass rd",
            "address2": "",
            "city": "NY",
            "state": "NY",
            "zipCode": "34545"
        },
        {
            "id": 131,
            "address1": "33 Tgfttg rd",
            "address2": "",
            "city": "Paramus",
            "state": "NJ",
            "zipCode": "367676"
        },
              {
            "id": 132,
            "address1": "33 DESSS rd",
            "address2": "",
            "city": "Paramus",
            "state": "NJ",
            "zipCode": "367676"
        },
              {
            "id": 133,
            "address1": "33 Fgrr rd",
            "address2": "",
            "city": "Paramus",
            "state": "NJ",
            "zipCode": "367676"
        },
              {
            "id": 134,
            "address1": "33 Qwsee rd",
            "address2": "",
            "city": "Paramus",
            "state": "NJ",
            "zipCode": "367676"
        },
              {
            "id": 135,
            "address1": "33 UHTTC rd",
            "address2": "",
            "city": "Paramus",
            "state": "NJ",
            "zipCode": "367676"
        },
              {
            "id": 136,
            "address1": "33 Vggg rd",
            "address2": "",
            "city": "Paramus",
            "state": "NJ",
            "zipCode": "367676"
        },
              {
            "id": 137,
            "address1": "33 Psdsdf rd",
            "address2": "",
            "city": "Paramus",
            "state": "NJ",
            "zipCode": "367676"
        },
              {
            "id": 138,
            "address1": "33 VFCCC rd",
            "address2": "",
            "city": "Paramus",
            "state": "NJ",
            "zipCode": "367676"
        },
              {
            "id": 139,
            "address1": "323 Ngvv rd",
            "address2": "",
            "city": "Paramus",
            "state": "NJ",
            "zipCode": "367676"
        },
        {
            "id": 140,
            "address1": "2 Werts",
            "address2": "",
            "city": "WParamus",
            "state": "NJ",
            "zipCode": "78997"
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
        "title": "Architect",
        "addressId": 130
      },
      {
        "id": 31,
        "firstName": "Kris",
        "lastName": "Krishna",
        "phone": "203-456-7890",
        "email": "kshitiz@insys.com",
        "personType": "Employee",
        "business": "INSYS Group",
        "title": "Architect",
        "addressId": 131
      },
      {
        "id": 32,
        "firstName": "Christopher",
        "lastName": "Umbel",
        "phone": "203-456-7890",
        "email": "cumbel@pivotal.io",
        "personType": "Pivotal",
        "business": "Pivotal",
        "title": "Architect",
        "addressId": 138
      },
      {
        "id": 33,
        "firstName": "Michael",
        "lastName": "Forte",
        "phone": "203-456-7890",
        "email": "mforte@accenture.com",
        "personType": "Vendor",
        "business": "Aptium",
        "title": "Manager",
        "addressId": 132
      },
      {
        "id": 34,
        "firstName": "Werner",
        "lastName": "Vogels",
        "phone": "203-456-7890",
        "email": "mforte@comcast.com",
        "personType": "Client",
        "business": "Comcast",
        "title": "Manager",
        "addressId": 139
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
        "addressId": 133,
        "addressId": 133,
        "businessType": "Pivotal-Labs"
      },
      {
         "id": 31,
        "name": "Client",
        "description": "Business for CF and Spring",
        "addressId": 134,
        "businessType": "Client"
      },
      {
         "id": 32,
        "name": "Pivotal",
        "description": "Business Partners for Technologies",
        "addressId": 135,
        "businessType": "Pivotal"
      },
      {
        "id": 33,
        "name": "Vendor",
        "description": "Business Vednors for Technologies",
        "addressId": 136,
        "businessType": "Vendor"
      },
      {
        "id": 34,
        "name": "Insys",
        "description": "Insys group for Technologies",
        "addressId": 137,
        "businessType": "Insys"
      }
    ];

    return { "addresses": addresses, "persons": persons, "businesses": businesses, "personskills": personSkills };
  }
}
