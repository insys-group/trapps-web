import {Injectable} from '@angular/core';
import {ResourceParams} from 'ng2-resource-rest';
import { Skill } from '../models/roles.model';
import {CRUDResource} from '../resources/crud.resource';
import { Http, Headers, Response } from '@angular/http';
import { Injector } from '@angular/core';

@Injectable()
@ResourceParams({
  url: 'http://localhost:8081/api/v1/skills'
})
export class SkillService extends CRUDResource<Skill> {
constructor(http: Http, injector: Injector) {
      console.log('Instantiating service SkillService ****************** ' + Date.now());
      super(http , injector)
    }
}