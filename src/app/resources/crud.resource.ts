import {Injectable} from '@angular/core';
import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ng2-resource-rest';
import {RequestMethod} from '@angular/http';

interface IQueryInput {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
  isRead?: string;
}

export interface IResource {
  links?: any;
  content?: any;
}

interface IResources extends IResource
 {
  links?: any;
  content?: Array<IResource>;
  page?: any;
}

export class CRUDResource<T extends IResource> extends Resource {
  @ResourceAction({
    isArray: false , map: function(data: Object): IResources  { return data as IResources; }
  })
  query: ResourceMethod<IQueryInput, IResources>;

  @ResourceAction({
    path: '/{!id}'
  })
  get: ResourceMethod<{id: any}, T>;

  @ResourceAction({
    method: RequestMethod.Post,
    path: '',
    headers: { 'Content-Type': 'application/json' }
  })
  save: ResourceMethod<T, T>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!id}'
  })
  update: ResourceMethod<T, T>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  remove: ResourceMethod<{id: any}, any>;

  // Alias to save
  create(data: T, callback?: (res: T) => any): T {
    console.log('save() ' + JSON.stringify(data));
    return this.save(data, callback);
  }

}