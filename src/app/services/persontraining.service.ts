import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";
import {Training, TrainingTask} from "../models/training.model";
import {Person, PersonTraining} from "../models/person.model";


@Injectable()
export class PersontrainingService {

    constructor(private restService: RestService) {
    }

    getPersonTrainings(): Observable<Array<PersonTraining>> {
        return this.restService.getAll<PersonTraining>(Locations.PERSON_TRAINING_URL);
    }

    getPersonTraining(id : number): Observable<PersonTraining> {
        return this.restService.getOne<PersonTraining>(`${Locations.PERSON_TRAINING_URL}${id}`);
    }

    save(personTraining : PersonTraining){
        return this.restService.create<PersonTraining>(Locations.PERSON_TRAINING_URL, personTraining);
    }

    remove(personTraining : PersonTraining){
        return this.restService.delete(personTraining);
    }
}