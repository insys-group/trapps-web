import { IResource } from '../resources/crud.resource';

export class Roles extends IResource {
    id: number;
    name: string;
    skills: Skill [];
}

export class Skill extends IResource {
    id: number;
    name: string;

     static getInstance() {
     let _skill = new Skill();
      _skill.id=null;
      _skill.name=''
      return _skill;     
    }
}