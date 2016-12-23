import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Link, RestQuery, RestResource, RestPageResource } from '../models/rest.model'

@Injectable()
export class RestService implements OnInit {
  private headers = new Headers();
  private fileHeaders = new Headers();

  private personsUrl = '/api/persons';
  private personSkillsUrl = '/api/personskills';
  private personDocumentsUrl = '/api/persondocuments';
  
  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('ETag', '1');

    this.fileHeaders.append('Content-Type', 'multipart/form-data');
    this.fileHeaders.append('Access-Control-Allow-Origin', '*');
    //this.headers.append('Cache-Control', 'no-cache');
    //this.headers.append('If-Modified-Since', 'Mon, 26 Jul 1997 05:00:00 GMT');
    //this.headers.append('Pragma', 'no-cache');
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
    return this.http.get(url, { headers: this.headers })
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

  put<T extends RestResource>(url: string, resource: T): Observable<void> {
    console.log(`Updating resource at ${url}`);
    return this.http
      .put(url, resource, { headers: this.headers })
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

  /*
  upload(url: string, resource: any): Observable<void> {
    console.log(`Uploading resource ${url}`);
    return this.http
      .post(url, resource, { headers: this.fileHeaders })
      .catch(this.handleError);
  }
  var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
  */ 
  upload(url: string, file: any): Observable<any> {
    return Observable.create(observer => {
      var formData: any = new FormData();
      formData.append("file", file, file.name);
      var xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("loadstart", (event: Event) => {
        console.log('loadstart ********** called')
        observer.next({'currentValue': 0, 'maxValue': 100, 'percentUploaded': (Math.round(0 / 100 * 100) + "%")});
      }, false);
      xhr.upload.addEventListener("progress", (event: ProgressEvent) => {
        console.log('progress ********** called');
        if (event.lengthComputable) {
          observer.next({'currentValue': event.loaded, 'maxValue': event.total, 'percentUploaded': (Math.round(event.loaded / event.total * 100) + "%")});
        }
      }, false);
      xhr.upload.addEventListener("load", (event: Event) => {
        console.log('load ********** called');
      }, false); 

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status != 201) {
            console.log('Http status not 201. Error.....');
            observer.error('Error ********');
          } else {
            observer.complete();
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }

  getLink(rel: string, links: Array<Link>): Link {
    return links.find(link => link.rel===rel);
  }

  private handleError(error: Response): Observable<any> {
    console.error('An error occurred ', JSON.stringify(error));
    return Observable.throw(error.json().error);
  }
}