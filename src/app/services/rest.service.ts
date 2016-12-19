import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Link, RestQuery, RestResource, RestPageResource } from '../models/rest.model'

@Injectable()
export class RestService implements OnInit {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  private personsUrl = '/api/persons';
  private personSkillsUrl = '/api/personskills';
  private personDocumentsUrl = '/api/persondocuments';
  
  constructor(private http: Http) {
  }
  
  ngOnInit() { }

  //TODO
  getAllPerPage<T>(url: string, query: RestQuery): Observable<RestPageResource<T>> {
    console.log(`Loading resource(s) ${url}`);
    return this.http.get(url)
      .map(response => response.json().content as Array<T>)
      .catch(this.handleError);
  }

  getAll<T>(url: string): Observable<Array<T>> {
    console.log(`Loading resource(s) ${url}`);
    return this.http.get(url)
      .map(response => response.json().content as Array<T>)
      .catch(this.handleError);
  }

  getOne<T>(url: string): Observable<T> {
    console.log(`Loading resource(s) ${url}`);
    return this.http.get(url)
      .map(response => response.json() as T)
      .catch(this.handleError);
  }

  create<T>(url: string, resource: T): Observable<T> {
    console.log(`Loading resource(s) ${url}`);
    return this.http
      .post(url, resource, { headers: this.headers })
      .map(response => response.json() as T)
      .catch(this.handleError);
  }

  update<T extends RestResource>(resource: T): Observable<T> {
    let link=this.getLink('self', resource.links);
    if(!link) {
      return Observable.throw(`resurce does not have 'self' link. Cannot update.`);
    }
    console.log(`Updating resource at ${link.href}`);
    return this.http
      .put(link.href, resource, { headers: this.headers })
      .map(response => response.json() as T)
      .catch(this.handleError);
  }

  delete<T extends RestResource>(resource: T): Observable<void> {
    let link=this.getLink('self', resource.links);
    if(!link) {
      return Observable.throw(`resurce does not have 'self' link. Cannot update.`);
    }
    console.log(`Deleting resource at ${link.href}`);
    return this.http
      .delete(link.href, { headers: this.headers })
      .catch(this.handleError);
  }

  getLink(rel: string, links: Array<Link>): Link {
    return links.find(link => link.rel===rel);
  }

  private handleError(error: Response): Observable<any> {
    console.error('An error occurred ', JSON.stringify(error));
    return Observable.throw(error.json().error);
  }
}