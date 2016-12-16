import {Injectable} from '@angular/core';
import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ng2-resource-rest';
import {RequestMethod} from '@angular/http';
import { Observable } from 'rxjs/Observable';

interface IQueryInput {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
  isRead?: string;
}

export class IResource {
  links?: Array<any>;
  content?: Array<any>;
}

export interface IResources
 {
  links?: Array<any>;
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
    path: '/put/{!id}',
  })
  _update: ResourceMethod<T, T>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  remove: ResourceMethod<{id: any}, any>;

 @ResourceAction({
  })
  _getByUrl: ResourceMethod<IQueryInput, T>;

  // Alias to save
  create(data: T, callback?: (res: T) => any): T {
    console.log(` CRUDResource save() url=${this.getUrl}, data= ${JSON.stringify(data)} `);
    return this.save(data, callback);
  }

  public getAll() { return this.query().$observable; }
  public getOne(id: any) { return this.get({id: id}).$observable; }
  public createNew(obj: T) { return this.save(obj).$observable; }
  public update(obj: T) { return this._update(obj).$observable; }
  public delete(id: any) { return this.remove({id: id}).$observable; }
  public getByUrl(url: string) { this.setUrl(url); return this._getByUrl().$observable; }
}