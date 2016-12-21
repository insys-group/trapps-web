import { IResource } from '../resources/crud.resource';

export class Address extends IResource {
    id:number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;

    static getInstance() {
     let _address = new Address();
      _address.id=null;
      _address.address1='';
      _address.address2='';
      _address.city='';
      _address.state='';
      _address.zipCode='';
      _address.country='';
      return _address;     
    }
}