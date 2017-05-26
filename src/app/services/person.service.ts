import {Injector} from '@angular/core';
import {Injectable, OnInit} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Person, PersonSkill, PersonDocument} from '../models/person.model';
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";
import {BusinessService} from "./business.service";
import {Business} from "../models/business.model";
import {forEach} from "@angular/router/src/utils/collection";
import {Address} from "../models/address.model";

@Injectable()
export class PersonService implements OnInit {
  private headers = new Headers({'Content-Type': 'application/json'});
  private personsUrl = '/api/persons';
  private personSkillsUrl = '/api/personskills';
  private personDocumentsUrl = '/api/persondocuments';

  constructor(private http: Http, private restService: RestService) {
  }

  ngOnInit() {
  }

  getPersons(): Observable<Array<Person>> {
    return this.restService.getAll<Person>(Locations.PERSON_URL);
  }

  getPerson(id: number): Observable<Person> {
    return this.restService.getOne<Person>(Locations.PERSON_URL + id);
  }

  getPersonDetails(id: number): Observable<Person> {
    return this.restService.getOne<Person>(Locations.PERSON_DETAILS_URL + id);
  }

  getBusiness(person: Person): Observable<Business> {
    let url = '';
    person.links.forEach(function (link) {
      if (link.rel == 'business') {
        url = link.href;
      }
    });
    return this.restService.getOne<Business>(url);
  }

  getAdress(person: Person): Observable<Address> {
    let url = '';
    person.links.forEach(function (link) {
      if (link.rel == 'adress') {
        url = link.href;
      }
    });
    return this.restService.getOne<Address>(url);
  }

  getChilds(id: number): Observable<Person> {
    return this.restService.getOne<Person>(Locations.PERSON_URL + id);
  }

  checkEmail(person: Person) {
    return this.restService.post<boolean>(Locations.CHECK_EMAIL_URL, person);
  }

  savePerson(person: Person) {
    return this.restService.create<Person>(Locations.PERSON_URL, person);
  }

  removePerson(person: Person): Observable<void> {
    return this.restService.delete(person);
  }

  uploadFile(personId: number, file: any): Observable<any> {
    return this.restService.uploadFile(Locations.PERSON_DOCUMENT_URL + personId, file);
  }

  downloadFile(id: number): Observable<any> {
    return this.restService.downloadFile(Locations.PERSON_DOCUMENT_URL + id);
  }

  deleteFile(id: number): Observable<any> {
    return this.restService.deleteFile(Locations.PERSON_DOCUMENT_URL + id);
  }

  private handleError(error: Response): Observable<any> {
    console.error('An error occurred ', JSON.stringify(error));
    return Observable.throw(error.json().error);
  }
}