//import {Injectable} from '@angular/core';
//import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ng2-resource-rest';
//import {RequestMethod} from '@angular/http';
//import { Address } from '../models/address.model';
//
//interface IQueryInput {
//  page?: number;
//  perPage?: number;
//  dateFrom?: string;
//  dateTo?: string;
//  isRead?: string;
//}
//
//interface IResource extends Address {
//  links?: any;
//  content?: any;  
//}
//
//interface IResources extends IResource
// {
//  links: any;
//  content: Array<IResource>;
//  page: any;
//}
//
//@Injectable()
//@ResourceParams({
//    url: 'http://localhost:8081/api/v1/addresses'
//})
//export class AddressRes extends Resource {
//
//  @ResourceAction({
//    isArray: false , map: function(x: Object): IResources  { return x as IResources }
//  })
//  query: ResourceMethod<IQueryInput, IResources>;
//
//  @ResourceAction({
//    path: '/{!id}'
//  })
//  get: ResourceMethod<{id: any}, IResource>;
//
//  @ResourceAction({
//    method: RequestMethod.Post
//  })
//  save: ResourceMethod<IResource, IResource>;
//
//  @ResourceAction({
//    method: RequestMethod.Put,
//    path: '/{!id}'
//  })
//  update: ResourceMethod<IResource, IResource>;
//
//  @ResourceAction({
//    method: RequestMethod.Delete,
//    path: '/{!id}'
//  })
//  remove: ResourceMethod<{id: any}, any>;
//
//  // Alias to save
//  create(data: IResource, callback?: (res: IResource) => any): IResource {
//    return this.save(data, callback);
//  }
//
//}