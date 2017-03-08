import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Training, TrainingTask} from "../models/training.model";
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";


@Injectable()
export class TrainingService {

  constructor(private restService: RestService) {
  }

  getTrainings(): Observable<Array<Training>> {
    return this.restService.getAll<Training>(Locations.TRAINING_URL);
  }

  getTraining(id : number): Observable<Training> {
    return this.restService.getOne<Training>(`${Locations.TRAINING_URL}${id}`);
  }

  save(training : Training){
    return this.restService.create<Training>(Locations.TRAINING_URL, training);
  }

  remove(training : Training){
    return this.restService.delete(training);
  }

}