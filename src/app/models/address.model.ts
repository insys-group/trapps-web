import { IResource } from '../resources/crud.resource';

export class Address extends IResource {
    id:number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
}
