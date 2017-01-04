import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Link, RestQuery, RestResource, RestPageResource, UploadProgress, ErrorResponse } from '../models/rest.model'

@Injectable()
export class RestService implements OnInit {
  private headers = new Headers();
  private loadHeaders = new Headers();
  private fileHeaders = new Headers();

  private personsUrl = '/api/persons';
  private personSkillsUrl = '/api/personskills';
  private personDocumentsUrl = '/api/persondocuments';
  
  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');

    this.loadHeaders.append('Content-Type', 'application/json');
    //this.loadHeaders.append('If-None-Match', '\"0\"');

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
      .catch(error => this.handleError(url, error));
  }

  getAll<T>(url: string): Observable<Array<T>> {
    console.log(`Loading resource(s) ${url}`);
    return this.http.get(url, { headers: this.loadHeaders })
      .map(response => response.json().content as Array<T>)
      .catch(error => this.handleError(url, error));
  }

  getOne<T>(url: string): Observable<T> {
    console.log(`Loading resource(s) ${url}`);
    return this.http.get(url, { headers: this.loadHeaders })
      .map(response => response.json() as T)
      .catch(error => this.handleError(url, error));
  }

  create<T>(url: string, resource: T): Observable<T> {
    console.log(`Loading resource(s) ${url}`);
    return this.http
      .post(url, resource, { headers: this.headers })
      .map(response => response.json() as T)
      .catch(error => this.handleError(url, error));
  }

  update<T extends RestResource>(resource: T): Observable<T> {
    let link=this.getLink('self', resource.links);
    if(!link) {
      return Observable.throw(`resurce does not have 'self' link. Cannot update.`);
    }
    let url=link.href;
    console.log(`Updating resource at ${url}`);
    return this.http
      .put(url, resource, { headers: this.headers })
      .map(response => response.json() as T)
      .catch(error => this.handleError(url, error));
  }

  put<T extends RestResource>(url: string, resource: T): Observable<void> {
    console.log(`Updating resource at ${url}`);
    return this.http
      .put(url, resource, { headers: this.headers })
      .catch(error => this.handleError(url, error));
  }

  delete<T extends RestResource>(resource: T): Observable<void> {
    let link=this.getLink('self', resource.links);
    if(!link) {
      return Observable.throw(`resurce does not have 'self' link. Cannot update.`);
    }
    let url = link.href;
    console.log(`Deleting resource at ${url}`);
    return this.http
      .delete(url, { headers: this.headers })
      .catch(error => this.handleError(url, error));
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
  uploadFile<T>(url: string, file: any): Observable<any> {
    return Observable.create(observer => {
      var formData: any = new FormData();
      formData.append("file", file, file.name);
      var xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("loadstart", (event: Event) => {
        console.log('loadstart ********** called')
        let uploadProgress=new UploadProgress();
        uploadProgress.currentValue=0;
        uploadProgress.maxValue=100;
        uploadProgress.percentUploaded=0;
        observer.next(uploadProgress);
      }, false);
      xhr.upload.addEventListener("progress", (event: ProgressEvent) => {
        console.log('progress ********** called');
        if (event.lengthComputable) {
          let uploadProgress=new UploadProgress();
          uploadProgress.currentValue=event.loaded;
          uploadProgress.maxValue=event.total;
          uploadProgress.percentUploaded=Math.round(event.loaded / event.total * 100);
          observer.next(uploadProgress);
        }
      }, false);
      xhr.upload.addEventListener("load", (event: Event) => {
        console.log('load ********** called');
      }, false);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status != 201) {
            console.log('Http status not 201. Error.....');
            observer.error('Internal server error occured while uploading file');
          } else {
            console.log('Completing request' + JSON.stringify(JSON.parse(xhr.responseText)));
            observer.next(JSON.parse(xhr.responseText) as T);
            observer.complete();
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.setRequestHeader("x-filename", file.name);
      xhr.send(formData);
    });
  }

  deleteFile<T>(url: string): Observable<T> {
    console.log(`Deleting file at ${url}`);
    return this.http
      .delete(url, { headers: this.headers })
      .map(response => response.json() as T)
      .catch(error => this.handleError(url, error));
  }

  getLink(rel: string, links: Array<Link>): Link {
    return links.find(link => link.rel===rel);
  }

  private handleError(url: string, error: Response): Observable<any> {
    let errorResponse: ErrorResponse;
    if(error.status===0) {
      errorResponse=new ErrorResponse(url, 'Application services not available right now. Please try again later.', error);
    } else {
      errorResponse=new ErrorResponse(url, `Error occured while communicating with services: ${error.json().error}`, error);
    }
    console.error('RestService.handleError() -> ', JSON.stringify(errorResponse));
    return Observable.throw(errorResponse);
  }
}