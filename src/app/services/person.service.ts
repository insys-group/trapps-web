import { Injector } from '@angular/core';
import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ResourceParams } from 'ng2-resource-rest';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Person, PersonSkill, PersonDocument } from '../models/person.model';

@Injectable()
export class PersonService implements OnInit {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private personsUrl = '/api/persons';
    private personSkillsUrl = '/api/personskills';
    private personDocumentsUrl = '/api/persondocuments';

    constructor(private http: Http) { 
    }
    ngOnInit() {  }

    getPersons(): Observable<Array<Person>> {
        return this.http.get(this.personsUrl)
        .map(response =>response.json().data as Person[])
        .catch(this.handleError);
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
        const url = `${this.personsUrl}/${person.id}`;
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
        const url = `${this.personSkillsUrl}/?personId=${personId}`;
        return this.http.get(url)
        .map(response =>response.json().data as PersonSkill[])
        .catch(this.handleError);
    }

    createSkill(personSkill: PersonSkill): Observable<PersonSkill> {
        console.log('Enter: PersonService.createSkill()' + JSON.stringify(personSkill));
        return this.http
            .post(this.personSkillsUrl, personSkill, { headers: this.headers })
            .map(response => response.json().data as PersonSkill)
            .catch(this.handleError);
    }

    createSkills(personSkills: PersonSkill[]): Observable<PersonSkill[]> {
        console.log('Enter: PersonService.createSkills()' + JSON.stringify(personSkills));
        return this.http
            .post(this.personSkillsUrl, personSkills, { headers: this.headers })
            .map(response => response.json().data as PersonSkill[])
            .catch(this.handleError);
    }

    deleteSkill(id: number): Observable<void> {
        const url = `${this.personSkillsUrl}/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .catch(this.handleError);
    }

    getPersonDocuments(personId: number): Observable<Array<PersonDocument>> {
        console.log(`Enter: getPersonDocuments(${personId})`);
        const url = `${this.personDocumentsUrl}/?personId=${personId}`;
        return this.http.get(url)
        .map(response =>response.json().data as PersonDocument[])
        .do(data => console.log(JSON.stringify(data)))
        .catch(this.handleError);
    }

    private handleError(error: Response): Observable<any> {
        console.error('An error occurred ', JSON.stringify(error));
        return Observable.throw(error.json().error);
    }
}
