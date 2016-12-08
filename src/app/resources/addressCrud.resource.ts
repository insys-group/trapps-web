import {Injectable} from '@angular/core';
import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ng2-resource-rest';
//import {RequestMethod} from '@angular/http';
import { Address } from '../models/address.model';
import { NResourceCRUD } from '../resources/NResourceCRUD';

interface IQueryInput {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
  isRead?: string;
}

interface IResource extends Address {
  links?: any;
  content?: any;  
}

interface IResources extends IResource
 {
  links: any;
  content: Array<IResource>;
  page: any;
}


@Injectable()
@ResourceParams({
   url: 'http://localhost:8081/api/addresses'
})
export class NewAddressRes extends NResourceCRUD<IQueryInput, IResources , IResource> {}