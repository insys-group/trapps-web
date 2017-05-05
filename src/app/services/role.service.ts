import {Injectable, OnInit} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Injector} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Role, Skill} from "../models/role.model";
import {Locations} from "../models/rest.model";
import {RestService} from "./rest.service";

@Injectable()
export class RoleService {

  constructor(private restService: RestService) {
  }

  getAll(): Observable<Array<Role>> {
    return this.restService.getAll<Role>(Locations.ROLE_URL);
  }

  save(role : Role){
    return this.restService.create<Role>(Locations.ROLE_URL, role);
  }

  update(role : Role){
    return this.restService.update<Role>(role);
  }

  remove(role : Role){
    return this.restService.delete(role);
  }

  getAllSkills(): Observable<Array<Skill>> {
    return this.restService.getAll<Skill>(Locations.SKILL_URL);
  }

  saveSkill(skill : Skill){
    return this.restService.create<Skill>(Locations.SKILL_URL, skill);
  }

  updateSkill(skill : Skill){
    return this.restService.update<Skill>(skill);
  }

  removeSkill(skill : Skill){
    return this.restService.delete(skill);
  }

  getSkills(role: Role): Observable<Array<Skill>> {
    let url = '';
    role.links.forEach(function(link) {
      if(link.rel == 'skills'){
        url = link.href;
      }
    });
    return this.restService.getAll<Skill>(url);
  }

  saveSkills(role : Role){
    return this.restService.post<Role>(Locations.ROLE_SKILL_URL, role);
  }

}
