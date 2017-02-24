import { Injector } from '@angular/core';
import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Person, PersonSkill, PersonDocument } from '../models/person.model';
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";

@Injectable()
export class PersonService implements OnInit {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private personsUrl = '/api/persons';
    private personSkillsUrl = '/api/personskills';
    private personDocumentsUrl = '/api/persondocuments';
    private personTrainingsUrl = '/api/persontrainings';

    constructor(private http: Http, private restService: RestService) {
    }
    ngOnInit() {  }

    getPersons(): Observable<Array<Person>> {
        return this.restService.getAll<Person>(Locations.PERSON_URL);
    }

    getPerson(id: number): Observable<Person> {
        return this.http.get(`${this.personsUrl}/${id}`)
        .map(response =>response.json().data as Person)
        .do(data => console.log('Person Found by Id ' + data.id))
        .catch(this.handleError);
    }

    createPerson(person: Person): Observable<Person> {
        console.log('Enter: PersonService.create()' + JSON.stringify(person));
        return this.http
            .post(this.personsUrl, person, { headers: this.headers })
            .map(response => response.json().data as Person)
            .catch(this.handleError);
    }

    updatePerson(person: Person): Observable<Person> {
        console.log('Enter: PersonService.update()' + JSON.stringify(person));
        const url = `${this.personsUrl}/${person.id}`;
        console.log('Enter: PersonService.update() url ' + url);
        return this.http
            .put(url, JSON.stringify(person), { headers: this.headers })            
            .map(() => person)
            .catch(this.handleError);
    }

    deletePerson(id: number): Observable<void> {
        const url = `${this.personsUrl}/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .catch(this.handleError);
    }

    getPersonSkills(personId: number): Observable<Array<PersonSkill>> {
        return null;
    }

    createSkill(personSkill: PersonSkill): Observable<PersonSkill> {
        console.log('Enter: PersonService.createSkill()' + JSON.stringify(personSkill));
         return null;
    }

    createSkills(personSkills: PersonSkill[]): Observable<PersonSkill[]> {
         return null;
    }

    deleteSkill(id: number): Observable<void> {
        return null;
    }

    getPersonDocuments(personId: number): Observable<Array<PersonDocument>> {
        return null;
    }

    private handleError(error: Response): Observable<any> {
        console.error('An error occurred ', JSON.stringify(error));
        return Observable.throw(error.json().error);
    }
}