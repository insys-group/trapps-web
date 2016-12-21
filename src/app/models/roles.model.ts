import { IResource } from '../resources/crud.resource';

export class Roles extends IResource {
    id: number;
    name: string;
   // skill: string;
    skills: Skill [];
}

export class Skill extends IResource {
    id: number;
    name: string;
}