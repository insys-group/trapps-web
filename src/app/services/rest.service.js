"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var rest_model_1 = require('../models/rest.model');
var RestService = (function () {
    function RestService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.loadHeaders = new http_1.Headers();
        this.fileHeaders = new http_1.Headers();
        this.personsUrl = '/api/persons';
        this.personSkillsUrl = '/api/personskills';
        this.personDocumentsUrl = '/api/persondocuments';
        this.headers.append('Content-Type', 'application/json');
        this.loadHeaders.append('Content-Type', 'application/json');
        //this.loadHeaders.append('If-None-Match', '\"0\"');
        this.fileHeaders.append('Content-Type', 'multipart/form-data');
        this.fileHeaders.append('Access-Control-Allow-Origin', '*');
        //this.headers.append('Cache-Control', 'no-cache');
        //this.headers.append('If-Modified-Since', 'Mon, 26 Jul 1997 05:00:00 GMT');
        //this.headers.append('Pragma', 'no-cache');
    }
    RestService.prototype.ngOnInit = function () { };
    //TODO
    RestService.prototype.getAllPerPage = function (url, query) {
        var _this = this;
        console.log("Loading resource(s) " + url);
        return this.http.get(url)
            .map(function (response) { return response.json().content; })
            .catch(function (error) { return _this.handleError(url, error); });
    };
    RestService.prototype.getAll = function (url) {
        var _this = this;
        console.log("Loading resource(s) " + url);
        return this.http.get(url, { headers: this.loadHeaders })
            .map(function (response) { return response.json().content[0].id ? response.json().content : []; })
            .catch(function (error) { return _this.handleError(url, error); });
    };
    RestService.prototype.getOne = function (url) {
        var _this = this;
        console.log("Loading resource(s) " + url);
        return this.http.get(url, { headers: this.loadHeaders })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return _this.handleError(url, error); });
    };
    RestService.prototype.create = function (url, resource) {
        var _this = this;
        console.log("Loading resource(s) " + url);
        return this.http
            .post(url, resource, { headers: this.headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return _this.handleError(url, error); });
    };
    RestService.prototype.update = function (resource) {
        var _this = this;
        var link = this.getLink('self', resource.links);
        if (!link) {
            return Observable_1.Observable.throw("resurce does not have 'self' link. Cannot update.");
        }
        var url = link.href;
        console.log("Updating resource at " + url);
        return this.http
            .put(url, resource, { headers: this.headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return _this.handleError(url, error); });
    };
    RestService.prototype.put = function (url, resource) {
        var _this = this;
        console.log("Updating resource at " + url);
        return this.http
            .put(url, resource, { headers: this.headers })
            .catch(function (error) { return _this.handleError(url, error); });
    };
    RestService.prototype.delete = function (resource) {
        var _this = this;
        var link = this.getLink('self', resource.links);
        if (!link) {
            return Observable_1.Observable.throw("resurce does not have 'self' link. Cannot update.");
        }
        var url = link.href;
        console.log("Deleting resource at " + url);
        return this.http
            .delete(url, { headers: this.headers })
            .catch(function (error) { return _this.handleError(url, error); });
    };
    RestService.prototype.getOneWithChilds = function (url, id) {
        var _this = this;
        console.log("Loading resource(s) " + url);
        return this.http.get(url + id + '?projection=inline', { headers: this.loadHeaders })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return _this.handleError(url, error); });
    };
    // getChild<T extends RestResource>(resource: T, childName : string) {
    //   let link=this.getLink(childName, resource.links);
    //   if(!link) {
    //     return Observable.throw(`resurce does not have child link.`);
    //   }
    //   let url = link.href;
    //   console.log(`Loading resource(s) ${url}`);
    //   return this.http.get(url, { headers: this.loadHeaders })
    //     .map(response => response.json() as T)
    //     .catch(error => this.handleError(url, error));
    // }
    //
    // getChilds<T extends RestResource>(resource: T, childName : string) {
    //   let link=this.getLink(childName, resource.links);
    //   if(!link) {
    //     return Observable.throw(`resurce does not have child link.`);
    //   }
    //   let url = link.href;
    //   console.log(`Loading resource(s) ${url}`);
    //   return this.http.get(url, { headers: this.loadHeaders })
    //     .map(response => response.json().content[0].id ? response.json().content : [] as Array<T>)
    //     .catch(error => this.handleError(url, error));
    // }
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
    RestService.prototype.uploadFile = function (url, file) {
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData();
            formData.append("file", file, file.name);
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("loadstart", function (event) {
                console.log('loadstart ********** called');
                var uploadProgress = new rest_model_1.UploadProgress();
                uploadProgress.currentValue = 0;
                uploadProgress.maxValue = 100;
                uploadProgress.percentUploaded = 0;
                observer.next(uploadProgress);
            }, false);
            xhr.upload.addEventListener("progress", function (event) {
                console.log('progress ********** called');
                if (event.lengthComputable) {
                    var uploadProgress = new rest_model_1.UploadProgress();
                    uploadProgress.currentValue = event.loaded;
                    uploadProgress.maxValue = event.total;
                    uploadProgress.percentUploaded = Math.round(event.loaded / event.total * 100);
                    observer.next(uploadProgress);
                }
            }, false);
            xhr.upload.addEventListener("load", function (event) {
                console.log('load ********** called');
            }, false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status != 201) {
                        console.log('Http status not 201. Error.....');
                        observer.error('Internal server error occured while uploading file');
                    }
                    else {
                        console.log('Completing request' + JSON.stringify(JSON.parse(xhr.responseText)));
                        observer.next(JSON.parse(xhr.responseText));
                        observer.complete();
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.setRequestHeader("x-filename", file.name);
            xhr.send(formData);
        });
    };
    RestService.prototype.deleteFile = function (url) {
        var _this = this;
        console.log("Deleting file at " + url);
        return this.http
            .delete(url, { headers: this.headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return _this.handleError(url, error); });
    };
    RestService.prototype.getLink = function (rel, links) {
        return links.find(function (link) { return link.rel === rel; });
    };
    RestService.prototype.handleError = function (url, error) {
        var errorResponse;
        if (error.status === 0) {
            errorResponse = new rest_model_1.ErrorResponse(url, 'Application services not available right now. Please try again later.', error);
        }
        else {
            errorResponse = new rest_model_1.ErrorResponse(url, "Error occured while communicating with services: " + error.json().error, error);
        }
        console.error('RestService.handleError() -> ', JSON.stringify(errorResponse));
        return Observable_1.Observable.throw(errorResponse);
    };
    RestService = __decorate([
        core_1.Injectable()
    ], RestService);
    return RestService;
}());
exports.RestService = RestService;
